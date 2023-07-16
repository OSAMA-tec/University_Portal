const generateReport = (records) => {
    const report = {
        presentCount: 0,
        absentCount: 0,
        presentDates: [],
        absentDates: [],
        allrecords:[],
    };

    records.forEach(record => {
        if (record.status === 'Present') {
            report.presentCount++;
            report.presentDates.push(new Date(record.date).toISOString().slice(0, 10));
        } else if (record.status === 'Absent') {
            report.absentCount++;
            report.absentDates.push(new Date(record.date).toISOString().slice(0, 10));
        }
        report.allrecords.push(record)
    });

    return report;
};


module.exports={generateReport}