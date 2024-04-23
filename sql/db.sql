-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.projects_id_project_seq;

CREATE SEQUENCE public.projects_id_project_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.times_todo_id_times_todo_seq;

CREATE SEQUENCE public.times_todo_id_times_todo_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.todos_id_todo_seq;

CREATE SEQUENCE public.todos_id_todo_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.projects definition

-- Drop table

-- DROP TABLE public.projects;

CREATE TABLE public.projects (
	id_project serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	active bool DEFAULT true NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp NULL,
	deleted_at timestamp NULL,
	CONSTRAINT projects_pkey PRIMARY KEY (id_project)
);


-- public.todos definition

-- Drop table

-- DROP TABLE public.todos;

CREATE TABLE public.todos (
	id_todo serial4 NOT NULL,
	id_project int4 NOT NULL,
	"name" varchar(100) NOT NULL,
	completed bool DEFAULT false NULL,
	working_on bool DEFAULT false NULL,
	active bool DEFAULT true NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp NULL,
	deleted_at timestamp NULL,
	finished_at timestamp NULL,
	CONSTRAINT todos_pkey PRIMARY KEY (id_todo),
	CONSTRAINT todos_id_project_fkey FOREIGN KEY (id_project) REFERENCES public.projects(id_project)
);


-- public.times_todo definition

-- Drop table

-- DROP TABLE public.times_todo;

CREATE TABLE public.times_todo (
	id_times_todo serial4 NOT NULL,
	id_todo int4 NULL,
	active bool DEFAULT true NULL,
	created_manually bool DEFAULT false NULL,
	started_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	stopped_at timestamp NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp NULL,
	deleted_at timestamp NULL,
	CONSTRAINT times_todo_pkey PRIMARY KEY (id_times_todo),
	CONSTRAINT times_todo_id_todo_fkey FOREIGN KEY (id_todo) REFERENCES public.todos(id_todo)
);



-- DROP FUNCTION public.projects_del_project(int4, bool);

CREATE OR REPLACE FUNCTION public.projects_del_project(_id_project integer, _safe_delete boolean)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
begin	
	if exists(select * from todos where id_project = _id_project and todos.active) and _safe_delete is true then
		RETURN to_json('{"code": 400, "status": false, "msg": "Project has active todos"}'::json);
	end if;
	
 	if exists(select * from projects where id_project = _id_project and active = true) then 
		update projects set active = false, deleted_at = current_timestamp  where id_project = _id_project;
	 	update todos set active = false, deleted_at  = current_timestamp where id_project = _id_project;
 		RETURN to_json('{"code": 200, "status": true, "msg": "Project deleted"}'::json);
 	else
 	 	RETURN to_json('{"code": 400, "status": false, "msg": "Project not found"}'::json);
 	end if;
	
END;
$function$
;

-- DROP FUNCTION public.projects_get_projects();

CREATE OR REPLACE FUNCTION public.projects_get_projects()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from 
  (select p.id_project, p.name from projects p where p.active is true order by p.id_project) 
   as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.projects_ins_project(varchar);

CREATE OR REPLACE FUNCTION public.projects_ins_project(_name character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if exists(select * from projects where name = _name and active = true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is already a project with that Name"}'::json);
 	end if;
 
 	insert into projects(name) values (_name);
 	RETURN to_json('{"code": 200, "status": true, "msg": "Project Created"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.projects_upd_project(int4, varchar);

CREATE OR REPLACE FUNCTION public.projects_upd_project(_id_project integer, _name character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if not exists(select * from projects where id_project = _id_project and active = true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Project not found"}'::json);
 	end if;
 
 	if exists(select * from projects where name = _name and id_project != _id_project and active = true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is already a project with that Name"}'::json);
 	end if;
 
	update projects set name = _name, updated_at = current_timestamp  where id_project = _id_project;
 	RETURN to_json('{"code": 200, "status": true, "msg": "Project Updated"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.times_todo_del_time(int4);

CREATE OR REPLACE FUNCTION public.times_todo_del_time(_id_times_todo integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if exists(select * from times_todo where id_times_todo = _id_times_todo and active = true) then 
		update times_todo  set active = false, deleted_at = current_timestamp  where id_times_todo = _id_times_todo;
 		RETURN to_json('{"code": 200, "status": true, "msg": "Time deleted"}'::json);
 	else
 	 	RETURN to_json('{"code": 400, "status": false, "msg": "Time not found"}'::json);
 	end if;
	
END;
$function$
;

-- DROP FUNCTION public.times_todo_ins_time(int4, timestamp, timestamp);

CREATE OR REPLACE FUNCTION public.times_todo_ins_time(_id_todo integer, _started_at timestamp without time zone, _stopped_at timestamp without time zone)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
begin
	if not exists(select * from todos t where t.id_todo = _id_todo and t.active is true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
	
	if exists(select * from todos t where t.id_todo = _id_todo and t.active is true and t.working_on is true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo is currelnty working on"}'::json);
 	end if;
	
 	if exists(select * from times_todo td where td.started_at = _started_at and td.stopped_at  >= _stopped_at and td.id_todo = _id_todo and td.active is true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is already a time with those dates"}'::json);
 	end if;
 
 	insert into times_todo(id_todo, created_manually, started_at, stopped_at) values (_id_todo, true ,_started_at, _stopped_at);
 	RETURN to_json('{"code": 200, "status": true, "msg": "Time Added"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.times_todo_upd_time(int4, int4, timestamp, timestamp);

CREATE OR REPLACE FUNCTION public.times_todo_upd_time(_id_times_todo integer, _id_todo integer, _started_at timestamp without time zone, _stopped_at timestamp without time zone)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
begin
	if not exists(select * from times_todo tt where tt.id_times_todo = _id_times_todo and tt.active is true ) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
	
 	if not exists(select * from todos t where t.id_todo = _id_todo and t.active is true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
	
	if exists(select * from todos t where t.id_todo = _id_todo and t.active is true and t.working_on is true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo is currelnty working on"}'::json);
 	end if;
	
 	if exists(select * from times_todo td where td.started_at = _started_at and td.stopped_at  >= _stopped_at and id_times_todo != _id_times_todo and td.id_todo = _id_todo and td.active is true) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is already a time with those dates"}'::json);
 	end if;
 
	update times_todo  set started_at  = _started_at, stopped_at  = _stopped_at, updated_at = current_timestamp  where id_times_todo  = _id_times_todo;
 	RETURN to_json('{"code": 200, "status": true, "msg": "Todo time Updated"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.todos_complete_finish_todo(int4);

CREATE OR REPLACE FUNCTION public.todos_complete_finish_todo(_id_todo integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
declare
	status_todo boolean;
BEGIN
 	if not exists(select * from todos where id_todo = _id_todo and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
 
    select t.completed into status_todo from todos t where t.id_todo = _id_todo;
    
    if(status_todo is true) then
	    update todos  set completed = false, finished_at = null where id_todo = _id_todo;
    else
        update todos set completed = true, finished_at = current_timestamp where id_todo = _id_todo;
    end if;
    
 	RETURN to_json('{"code": 200, "status": true, "msg": "Todo Status Updated"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.todos_del_todo(int4);

CREATE OR REPLACE FUNCTION public.todos_del_todo(_id_todo integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if exists(select * from todos where id_todo = _id_todo and active) then 
		update todos set active = false, deleted_at = current_timestamp  where id_todo = _id_todo;
 		RETURN to_json('{"code": 200, "status": true, "msg": "Todo deleted"}'::json);
 	else
 	 	RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
	
END;
$function$
;

-- DROP FUNCTION public.todos_get_times(int4);

CREATE OR REPLACE FUNCTION public.todos_get_times(_id_todo integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from 
  (select id_times_todo, started_at, stopped_at from times_todo tt where id_todo = _id_todo and tt.active order by started_at desc) 
   as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.todos_get_todos();

CREATE OR REPLACE FUNCTION public.todos_get_todos()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from 
  (select t.id_todo, t.name, p.name as project, t.id_project ,t.completed, t.working_on, 
   todos_get_times(t.id_todo) as times from todos t 
   inner join projects p on t.id_project = p.id_project 
   where t.active
   order by t.id_project, t.id_todo) 
   as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.todos_get_todos_report_all(timestamp, timestamp);

CREATE OR REPLACE FUNCTION public.todos_get_todos_report_all(_from_date timestamp without time zone, _to_date timestamp without time zone)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from 
  (select t.id_todo, t.name, p.name as project, t.id_project ,t.completed, t.working_on, 
   todos_get_times(t.id_todo) as times from todos t 
   inner join projects p on t.id_project = p.id_project 
   where t.active and t.created_at between _from_date and _to_date
   order by t.id_project, t.id_todo) 
   as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.todos_get_todos_report_project(int4);

CREATE OR REPLACE FUNCTION public.todos_get_todos_report_project(_id_project integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from 
  (select t.id_todo, t.name, p.name as project, t.id_project ,t.completed, t.working_on, 
   todos_get_times(t.id_todo) as times from todos t 
   inner join projects p on t.id_project = p.id_project 
   where t.active and t.id_project = _id_project
   order by t.id_todo) 
   as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.todos_get_todos_report_uncomplete();

CREATE OR REPLACE FUNCTION public.todos_get_todos_report_uncomplete()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from 
  (select t.id_todo, t.name, p.name as project, t.id_project ,t.completed, t.working_on, 
   todos_get_times(t.id_todo) as times from todos t 
   inner join projects p on t.id_project = p.id_project 
   where t.active and t.completed is false
   order by t.id_project, t.id_todo) 
   as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.todos_ins_todo(varchar, int4);

CREATE OR REPLACE FUNCTION public.todos_ins_todo(_name character varying, _id_project integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
begin
	if not exists(select * from projects where id_project = _id_project and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is no project with that ID"}'::json);
 	end if;
 
 	if exists(select * from todos where name = _name and id_project = _id_project and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is already a todo with that Name"}'::json);
 	end if;
 
 	insert into todos(name, id_project) values (_name, _id_project);
 	RETURN to_json('{"code": 200, "status": true, "msg": "Todo Created"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.todos_upd_todo(int4, varchar, int4);

CREATE OR REPLACE FUNCTION public.todos_upd_todo(_id_todo integer, _name character varying, _id_project integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if not exists(select * from todos where id_todo = _id_todo and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
 
 	if not exists(select * from projects where id_project = _id_project and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Project not found"}'::json);
 	end if;
 
 	if exists(select * from todos where name = _name and id_todo != _id_todo and id_project = _id_project and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "There is already a todo with that Name"}'::json);
 	end if;
 
 	update todos set name = _name, id_project = _id_project, updated_at = current_timestamp  where id_todo = _id_todo;
 	RETURN to_json('{"code": 200, "status": true, "msg": "Todo Updated"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.todos_working_on_todo(int4);

CREATE OR REPLACE FUNCTION public.todos_working_on_todo(_id_todo integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
declare
	_working_on_todo boolean;
	_id_times_todo integer;
BEGIN
 	if not exists(select * from todos where id_todo = _id_todo and active) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo not found"}'::json);
 	end if;
 
 	if not exists(select * from todos where id_todo = _id_todo and completed = false) then 
 		RETURN to_json('{"code": 400, "status": false, "msg": "Todo completed cannot add time"}'::json);
 	end if;
 
    select working_on into _working_on_todo from todos where id_todo = _id_todo;
    
    if(_working_on_todo is true) then
    	
    	select id_times_todo into _id_times_todo from times_todo where id_todo = _id_todo and stopped_at is null order by id_times_todo desc limit 1; 
    
    	if(_id_times_todo is null) then
    		 RETURN to_json('{"code": 400, "status": false, "msg": "Todo is not working on"}'::json);
		end if;
	
 		update times_todo set stopped_at = current_timestamp where id_times_todo = _id_times_todo;
	    update todos  set working_on  = false where id_todo = _id_todo;
	    RETURN to_json('{"code": 200, "status": true, "msg": "Todo Time Stop"}'::json);
    else
    	insert into times_todo (id_todo) values (_id_todo);
	    update todos  set working_on = true where id_todo = _id_todo;
	    RETURN to_json('{"code": 200, "status": true, "msg": "Todo Time Start"}'::json);
    end if;
  
END;
$function$
;