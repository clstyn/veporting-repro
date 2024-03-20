export const downloadReportById = async (id, clientName, token) => {
  try {
    const response = await fetch(`/api/report/${id}/download`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
      },
      responseType: "arrayBuffer",
    });

    if (!response.ok) {
      throw new Error("Error downloading report");
    }

    const resData = await response.arrayBuffer();
    const fileBlob = new Blob([resData]);

    const url = window.URL.createObjectURL(fileBlob);

    // Create an anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Security Report - ${clientName}.docx`); // Set the file name
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
