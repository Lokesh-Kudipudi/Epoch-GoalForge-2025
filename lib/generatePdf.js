import jsPDF from "jspdf";
import { getImagesURL } from "@/constants/images";

const chechText = (text = "Lokesh") => {
  if (text.startsWith("\n")) {
    return text.slice(1);
  } else {
    return text;
  }
};

export const generatePDF = async (data) => {
  try {
    const doc = new jsPDF({
      unit: "px",
      compress: true,
      format: [1240, 1754],
    });

    const images = await getImagesURL();

    doc.addImage(images[0].dataURI, "png", 0, 0, 1240, 1754);
    doc.addPage();

    /////////////////////////
    doc.addImage(images[1].dataURI, "png", 0, 0, 1240, 1754);

    doc.setTextColor("#130730");
    doc.setFontSize(50);
    doc.setFont("Helvetica", "bold");
    doc.text(data.fullName, 615, 915, {
      align: "center",
    });

    doc.setFontSize(40);
    doc.setFont("Helvetica", "bold");
    doc.text(chechText(data.tagLine), 615, 1025, {
      align: "center",
      maxWidth: 630,
    });
    doc.addPage();
    //////////////////////////

    doc.addImage(images[2].dataURI, "png", 0, 0, 1240, 1754);

    doc.setTextColor("#eeba2b");
    doc.setFontSize(120);
    doc.setFont("Helvetica", "normal");
    doc.text(data.name.toUpperCase(), 170, 255, {
      maxWidth: 1020,
    });

    doc.setTextColor("#eeba2b");
    doc.setFontSize(140);
    doc.setFont("Helvetica", "normal");
    doc.text(chechText(data.score), 390, 1130, {
      align: "center",
    });

    doc.setTextColor("#ffffff");
    doc.setFontSize(40);
    doc.setFont("Helvetica", "normal");
    doc.text(chechText(data.resolutions), 210, 1210, {
      maxWidth: 365,
    });
    doc.addPage();
    ///////////////////////////////////////////

    doc.addImage(images[3].dataURI, "png", 0, 0, 1240, 1754);

    doc.setTextColor("#eeba2b");
    doc.setFontSize(120);
    doc.setFont("Helvetica", "bold");
    doc.text("ROADMAP", 620, 350, {
      align: "center",
    });

    doc.setTextColor("#ffffff");
    doc.setFontSize(48);
    doc.setFont("Helvetica", "normal");
    doc.text(chechText(data.roadmap), 155, 400, {
      maxWidth: 925,
    });
    doc.addPage();

    doc.addImage(images[4].dataURI, "png", 0, 0, 1240, 1754);
    doc.addPage();

    doc.addImage(images[5].dataURI, "png", 0, 0, 1240, 1754);
    doc.save(
      `${data.fullName}_Resolutions_RoadMap.pdf`.replace(
        " ",
        "_"
      )
    );
  } catch (error) {
    console.log(error);
  }
};
