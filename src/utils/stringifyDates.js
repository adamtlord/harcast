import toDateString from './toDateString';

export default options => {
    const qs = options;

    if (options.startDate) qs.start_date = toDateString(options.startDate);

    if (options.endDate) {
        qs.end_date = toDateString(options.endDate);
    }

    return qs;
};