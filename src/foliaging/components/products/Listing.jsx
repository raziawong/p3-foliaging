import React, { Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useSiteContext } from "../../states";
import Loader from "../global/Loader";
import { ContentBox } from "../../styles/components";

export default function Listing() {
  const [state] = useSiteContext();

  return (
    <Fragment>
      {state.isLoading ? (
        <Loader />
      ) : (
        <ContentBox>
          <Grid container sx={{ px: 6, py: 2 }} spacing={2}>
            {state.products.map((item) => (
              <Grid item key={item.id} xs={12} md={6} lg={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="450"
                    image={item.images[0]}
                  />
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>{item.title}</Typography>
                      <Typography>${item.price.toFixed(2)}</Typography>
                    </Box>
                    <Typography>
                      {item.plant_id
                        ? item.plant.description || ""
                        : item.planter_id
                        ? item.planter.description || ""
                        : item.supplie.description || ""}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ContentBox>
      )}
    </Fragment>
  );
}
