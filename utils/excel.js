const excelJS = require('exceljs');
const path = require('path');

class ExcelUtils {
  createReport = async (todos, title) => {
    try {
      const workbook = new excelJS.Workbook();
      const fileName = process.env.REPORT_TEMPLATE;
      const fileRoute = path.join(__dirname, '../files/', fileName);
      await workbook.xlsx.readFile(fileRoute);
      const worksheet = workbook.getWorksheet(1);

      const cellTitle = worksheet.getCell('C3');
      cellTitle.value = title;

      worksheet.addTable({
        name: 'Reporte',
        ref: 'B4',
        headerRow: true,
        style: {
          theme: 'TableStyleMedium1',
          showRowStripes: true,
        },
        columns: [
          { name: 'Todo', filterButton: true },
          { name: 'Project Name', filterButton: true },
          { name: 'Completed', filterButton: true },
          { name: 'Working On', filterButton: true },
          { name: 'Total Duration', filterButton: true },
        ],
        rows: todos,
      });

      const buffer = await workbook.xlsx.writeBuffer();
      return buffer;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ExcelUtils();
