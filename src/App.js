import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";
import Invoice from "./components/Invoice";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function App() {
  const printRef = React.useRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log(pdfWidth);
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };
  return (
    <Container>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} md={8} xl={6} my={5}>
          <Box>
            <Paper ref={printRef} elevation={3}>
              <Invoice />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={4} md={2} mt={{ xs: 0, lg: 5 }} mb={{ xs: 3, lg: 5 }}>
          <Box textAlign="center" mt={{ xs: 0, lg: 8 }}>
            <Button
              onClick={handleDownloadPdf}
              size="small"
              startIcon={<SimCardDownloadIcon />}
            >
              Download
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
