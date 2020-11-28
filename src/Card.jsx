import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

function winnerToColor(whiteMan) {
  if (whiteMan == "Biden") {
    return "#0c71e0";
  } else {
    return "#d5212e";
  }
}

function StateCard({ item, selected, setSelected }) {
  function toggleSelected() {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((x) => x !== item));
    }
  }

  return (
    <Grid key={item.state} item xs={12} sm={6} md={4} lg={3}>
      <Card
        style={{
          backgroundColor: selected.includes(item)
            ? winnerToColor(item.result)
            : "white",
          color: selected.includes(item) ? "white" : "black",
        }}
        key={item.state}
      >
        <CardActionArea onClick={() => toggleSelected()}>
          <CardContent>
            <Typography variant="h5">{item.state}</Typography>
            <Typography variant="subtitle2">
              Population:{" "}
              <Typography variant="body1" display="inline">
                {item.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              </Typography>
            </Typography>

            <Typography variant="subtitle2">
              Electoral votes:{" "}
              <Typography variant="body1" display="inline">
                {item.electoral}
              </Typography>
            </Typography>

            <Typography variant="subtitle2">
              Result:{" "}
              <Typography variant="body1" display="inline">
                {item.result}
              </Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default StateCard;
