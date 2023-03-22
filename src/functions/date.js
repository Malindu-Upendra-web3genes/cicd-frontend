import moment from 'moment';

function format(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

export { format };
