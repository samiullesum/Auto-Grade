import jsPDF from "jspdf";
import "jspdf-autotable";

const GeneratePDF = grades => {
  const doc = new jsPDF();
  const tableColumn = ["Student ID", "Name", "Total", "Grade"];
  const tableRows = [];

  const generateGrade = (total) => {
    if(total >= 90) {
        return "A";
    }
    else if(total >= 85 && total < 90) {
        return "A-";
    }
    else if(total >= 80 && total < 85) {
        return "B+";
    }
    else if(total >= 75 && total < 80) {
        return "B";
    }
    else if(total >= 70 && total < 75) {
        return "B-";
    }
    else if(total >= 65 && total < 70) {
        return "C+";
    }
    else if(total >= 60 && total < 65) {
        return "C";
    }
    else if(total >= 55 && total < 60) {
        return "C-";
    }
    else if(total >= 50 && total < 55) {
        return "D+";
    }
    else if(total >= 45 && total < 50) {
        return "D";
    }
    else {
        return "F";
    }
    
}
  grades.forEach(grade => {
    const gradeData = [
      grade.id,
      grade.name,
      grade.total,
      generateGrade(grade.total)
    ];
    tableRows.push(gradeData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save("report.pdf");
};

export default GeneratePDF;