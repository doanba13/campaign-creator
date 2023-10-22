import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Advertisement } from "../model";
import Button from "@mui/material/Button";
import { Add, CheckBoxRounded } from "@mui/icons-material";

interface Props {
  data: Advertisement[];
}

function SubCampaignList({ data }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          m: 1,
        }}
      >
        <Button sx={{ width: 150, height: "100%" }} variant="outlined">
          <Add sx={{ fontSize: 50 }} />
        </Button>
      </Box>
      {data.map(({ name, quantity, active }) => (
        <Container
          sx={{
            m: 1,
            border: 1,
            maxWidth: 300,
            borderColor: "divider",
          }}
        >
          <h2>
            {name}
            <CheckBoxRounded sx={{ color: active ? "green" : "gray" }} />
          </h2>
          <p style={{ textAlign: "center" }}>{quantity}</p>
        </Container>
      ))}
    </Box>
  );
}

export default SubCampaignList;
