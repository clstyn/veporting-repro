export const downloadReportById = async (id) => {
  try {
    const response = await fetch(`/api/report/${id}/download`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error downloading report");
    }

    const resData = await response.json();
    const buff = Buffer.from(resData.data.data, "base64");
    const fileBlob = new Blob([buff], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    console.log(fileBlob);
    const url = window.URL.createObjectURL(fileBlob);

    // Create an anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${id}.docx`); // Set the file name
    document.body.appendChild(link);

    // Initiate download
    link.click();

    // Cleanup
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

    // return {
    //   message: resData.message,
    //   file: fileBlob,
    // };
  } catch (error) {
    console.error(error);
  }
};
