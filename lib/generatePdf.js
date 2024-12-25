import jsPDF from "jspdf";
import { getImagesURL } from "@/constants/images";

export const generatePDF = async (data) => {
  try {
    const doc = new jsPDF({
      unit: "px",
      compress: true,
    });

    doc.text(data.name, 10, 20, {
      maxWidth: 400,
    });

    doc.text(data.fullName, 10, 35, {
      maxWidth: 400,
    });

    doc.text(data.email, 10, 55, {
      maxWidth: 400,
    });

    doc.text(data.tagLine, 10, 75, {
      maxWidth: 400,
    });

    doc.text(data.score, 10, 100, {
      maxWidth: 400,
    });

    doc.text(data.resolutions, 10, 125, {
      maxWidth: 400,
    });

    doc.text(data.roadmap, 10, 150, {
      maxWidth: 400,
    });

    // const doc = new jsPDF({
    //   unit: "px",
    //   // format: [1860, 2628],
    //   compress: true,
    // });

    // const images = await getImagesURL();

    // console.log(user);
    // doc.addImage(images[0].dataURI, "png", 0, 0, 1860, 2628);
    // doc.addPage();
    // doc.addImage(images[1].dataURI, "png", 0, 0, 1860, 2628);
    // doc.setTextColor("#130730");
    // doc.setFontSize(86);
    // doc.setFont("Times", "bold");

    // doc.text("testing", 915, 1380, {
    //   align: "center",
    // });

    // doc.addPage(); // doc.addImage(images[2].dataURI, "png", 0, 0, 1860, 2628); // doc.addPage();

    // doc.addImage(images[3].dataURI, "png", 0, 0, 1860, 2628);
    // doc.addPage();

    // doc.addImage(images[4].dataURI, "png", 0, 0, 1860, 2628);
    // doc.addPage();

    // doc.addImage(images[5].dataURI, "png", 0, 0, 1860, 2628);
    doc.save("testing.pdf");
  } catch (error) {
    console.log(error);
  }
};
