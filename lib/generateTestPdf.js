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

const data = {
  fullName: "A very Lenghty full name",
  name: "Lokesh Kudipudi",
  tagLine:
    "This is a Tagline for the User given by the assistant gemini",
  score: "90/100",
  resolutions: "1) Go to gym everyday. \n2)Play Flute Everyday",
  roadmap:
    "\nJanuary-March:\n- Set up a dedicated learning schedule for the MERN stack. Find resources like tutorials, courses, and communities.\n- Start a log of your daily exercise, noting how you feel, your heart rate, and any challenges.\n- Select a self-help book focused on goal-setting and time management for optimal habit formation.\n\n\nApril-June:\n- Focus on building practical projects to apply your MERN stack knowledge.\n- Gradually increase the intensity of your cardiac workouts, if you feel capable and fit.\n- Complete a self-help book focused on motivation and overcoming procrastination to improve your learning process.\n\n\nJuly-September:\n- Explore more advanced aspects of the MERN stack, perhaps focusing on specific areas of web development.\n- Continuously monitor and adjust your exercise routine to maintain motivation and prevent plateau.\n- Choose a self-help book focused on personal finance and budgeting to learn and apply financial knowledge.\n\n\nOctober-December:\n- Complete a portfolio of MERN stack projects.\n- Evaluate your exercise routine for the year, making adjustments for sustainability and improvement.\n- Focus on a self-help book that aligns with your personal growth objectives and areas of development.  Complete the 12 books by the end of the year.\n- Reflect on the progress made and adjust strategies for the upcoming year.\n\n\n",
};

export const generateTestPDF = async () => {
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
