class TimesUtil {
  getTimeFormatted = totalTime => {
    let totalSeconds = Math.floor(totalTime / 1000);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  transformDateToClientHour = (date, timeOffset) => {
    try {
      let dateToTransform = date ? new Date(date) : new Date();
      dateToTransform.setMinutes(dateToTransform.getMinutes() - timeOffset);
      return dateToTransform;
    } catch (error) {
      throw error;
    }
  };

  transformDateToUtcHour = (date, timeOffset) => {
    try {
      let dateToTransform = date ? new Date(date) : new Date();
      dateToTransform.setMinutes(dateToTransform.getMinutes() + timeOffset);
      return dateToTransform;
    } catch (error) {
      throw error;
    }
  };

  formatDate = date => {
    try {
      const yearClean = date.getFullYear();
      const monthClean = (date.getMonth() + 1).toString().padStart(2, '0');
      const dayClean = date.getDate().toString().padStart(2, '0');
      const hoursClean = date.getHours().toString().padStart(2, '0');
      const minutesClean = date.getMinutes().toString().padStart(2, '0');
      const secondsClean = date.getSeconds().toString().padStart(2, '0');

      return `${yearClean}-${monthClean}-${dayClean} ${hoursClean}:${minutesClean}:${secondsClean}`;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new TimesUtil();
