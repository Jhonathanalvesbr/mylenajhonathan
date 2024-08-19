import { Container, Grid } from "@mui/material";
import "./index.css";

const Carregar = () => {
  return (
    <Container style={{ height: "100vh" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={12}>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#737373",
              fontWeight: 600,
            }}
          >
            Carregando...
          </p>

          <span
            className="loader"
            style={{ background: "#737373", marginLeft: "8rem" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export const CarregarLoading = () => {
  return (
    <Container style={{ height: "50vh" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <span className="loader" style={{ color: "black" }} />
      </Grid>
    </Container>
  );
};

export const Loading = () => {
  return (
    <Container style={{ height: "100%", marginTop: "1rem" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <span className="loader" style={{ color: "black" }} />
      </Grid>
    </Container>
  );
};

export default Carregar;
