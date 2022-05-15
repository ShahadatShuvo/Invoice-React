import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";
import Invoice from "./components/Invoice";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { Box } from "@mui/system";
import Pdf from "react-to-pdf";

function App() {
  const ref = React.createRef();
  return (
    <Container>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} md={8} xl={6} my={5}>
          <Box ref={ref}>
            <Paper  elevation={3}>
              <Invoice />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={4} md={2} mt={{ xs: 0, lg: 5 }} mb={{ xs: 3, lg: 5 }}>
          <Box textAlign="center" mt={{ xs: 0, lg: 8 }}>
            <Pdf targetRef={ref} filename="Invoice.pdf">
              {({ toPdf }) => (
                <Button
                  onClick={toPdf}
                  size="small"
                  startIcon={<SimCardDownloadIcon />}
                >
                  Download
                </Button>
              )}
            </Pdf>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
