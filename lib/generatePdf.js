import jsPDF from "jspdf";
import { images } from "@/constants/images";

const chechText = (text = "Epoxh") => {
  if (text.startsWith("\n")) {
    text = text.slice(1);
  }
  if (text.endsWith("\n")) {
    text = text.slice(0, -1);
  }
  return text;
};

export const generatePDF = async (data) => {
  try {
    const doc = new jsPDF({
      unit: "px",
      compress: true,
      format: [1240, 1754],
    });

    /////////////////////////
    doc.addImage(images[0], "png", 0, 0, 1240, 1754);

    doc.setFontSize(42);
    const rectWidth = doc.getTextWidth(data.fullName) + 40 * 2;
    const rectHeight = 42 + 20 * 2;
    let rectX = 615 - rectWidth / 2;
    const rectY = 915 - rectHeight / 2;
    doc.setFillColor("#eeba2b");
    doc.roundedRect(
      rectX,
      rectY - 5,
      rectWidth,
      rectHeight,
      45,
      45,
      "F"
    );
    doc.setTextColor("#130730");
    doc.setFont("Helvetica", "bold");
    doc.text(data.fullName, 615, 915, {
      align: "center",
    });

    doc.setFontSize(40);
    doc.setFont("Helvetica", "bold");
    doc.text(chechText(data.tagLine), 615, 995, {
      align: "center",
      maxWidth: 630,
    });

    doc.addPage();
    //////////////////////////

    doc.addImage(images[1], "png", 0, 0, 1240, 1754);

    doc.setTextColor("#eeba2b");
    doc.setFontSize(120);
    doc.setFont("Helvetica", "normal");
    doc.text(data.name.toUpperCase(), 170, 255, {
      maxWidth: 1020,
    });

    doc.setTextColor("#eeba2b");
    doc.setFontSize(140);
    doc.setFont("Helvetica", "normal");
    doc.text(
      chechText(data.score).replace("/100", ""),
      390,
      1130,
      {
        align: "center",
      }
    );

    doc.setTextColor("#ffffff");
    doc.setFontSize(40);
    doc.setFont("Helvetica", "normal");
    doc.text(chechText(data.resolutions), 210, 1210, {
      maxWidth: 365,
    });
    doc.addPage();
    ///////////////////////////////////////////

    doc.addImage(images[2], "png", 0, 0, 1240, 1754);
    doc.addPage();

    /////////////////////////////////////////////////////////

    doc.addImage(images[3], "png", 0, 0, 1240, 1754);

    doc.setTextColor("#eeba2b");
    doc.setFontSize(120);
    doc.setFont("Helvetica", "bold");
    doc.text("ROADMAP", 620, 120, {
      align: "center",
    });

    doc.setTextColor("#ffffff");
    doc.setFontSize(42);
    doc.setFont("Helvetica", "normal");
    doc.text(
      chechText(data.roadmap).replace(/\n{3}/g, "\n\n"),
      50,
      170,
      {
        maxWidth: 1140,
      }
    );
    doc.addPage();

    doc.addImage(images[4], "png", 0, 0, 1240, 1754);
    doc.addPage();
    doc.addImage(images[5], "png", 0, 0, 1240, 1754);
    doc.save(
      `${data.fullName}_Resolutions_RoadMap.pdf`.replace(
        / /g,
        "_"
      )
    );
  } catch (error) {
    console.log(error);
  }
};
