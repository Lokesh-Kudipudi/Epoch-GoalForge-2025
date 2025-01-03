import jsPDF from "jspdf";
import { images } from "@/constants/images";

const chechText = (text = "Epoch") => {
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

    doc.setFontSize(50);
    const rectWidth = doc.getTextWidth(data.fullName) + 30 * 2;
    const rectHeight = 50 + 10 * 2;
    let rectX = 620 - rectWidth / 2;
    const rectY = 977 - rectHeight / 2;
    doc.setFillColor("#eeba2b");
    doc.roundedRect(
      rectX,
      rectY - 5,
      rectWidth,
      rectHeight,
      25,
      25,
      "F"
    );
    doc.setTextColor("#130730");
    doc.setFont("Helvetica", "bold");
    doc.text(data.fullName, 620, 977, {
      align: "center",
    });

    doc.setFontSize(40);
    doc.setFont("Helvetica", "bold");
    doc.text(chechText(data.tagLine), 620, 1077, {
      align: "center",
      maxWidth: 630,
    });

    doc.addPage();
    //////////////////////////

    doc.addImage(images[1], "png", 0, 0, 1240, 1754);

    doc.setTextColor("#4ddde0");
    doc.setFontSize(140);
    doc.setFont("Helvetica", "normal");
    doc.text(
      chechText(data.score).replace("/100", ""),
      620,
      510,
      {
        align: "center",
      }
    );

    doc.setTextColor("#ffffff");
    doc.setFontSize(48);
    doc.setFont("Helvetica", "normal");
    doc.text(chechText(data.resolutions), 255, 580, {
      maxWidth: 710,
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
      70,
      200,
      {
        maxWidth: 1120,
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
