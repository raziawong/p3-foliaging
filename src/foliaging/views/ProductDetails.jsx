import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Icon,
  IconButton,
  List,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LeafLoader,
  ImageCarousel,
  FlexBox,
  FrostedContentBox,
  ContentBox,
} from "../components";
import {
  fetchProductDetails,
  processCartAdd,
  processLogout,
  useSiteDispatchContext,
} from "../states";
import siteColors from "../styles/colors";
import { allowToProtectedRoute } from "../utils";

export default function ProductDetails() {
  const dispatch = useSiteDispatchContext();
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [detail, setDetails] = useState({});

  useLayoutEffect(() => {
    setLoading(true);
    (async () => {
      const resp = await fetchProductDetails({ dispatch, pid: params.id });

      if (resp) {
        resp.spec = resp.plant_id
          ? resp.plant
          : resp.planter_id
          ? resp.planter
          : resp.supply;
        resp.priceDisplay = resp.price ? `$${resp.price.toFixed(2)}` : "";
        resp.dimension = [];

        if (resp.width) {
          resp.dimension.push("W/D " + resp.width);
        }

        if (resp.height) {
          resp.dimension.push("H " + resp.height);
        }

        if (resp.dimension.length) {
          resp.dimension = resp.dimension.join(" x ").concat(" cm");
        }

        setDetails(resp);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [params.id]);

  const handleGuest = () => {
    processLogout({ dispatch });
    navigate("/login");
  };

  const handleAddToCart = (pid) => {
    allowToProtectedRoute((token) =>
      token
        ? processCartAdd({
            dispatch,
            token,
            cartItem: { pid },
          })
        : handleGuest()
    );
  };

  return loading ? (
    <LeafLoader />
  ) : (
    <FlexBox
      sx={{
        my: 4,
        p: 2,
        flexDirection: { xs: "column", md: "row" },
      }}>
      <FrostedContentBox shadowColor={siteColors.lavendar}>
        <Box sx={{ p: 10 }}>
          <ImageCarousel images={detail.images} height={"100%"} />
        </Box>
      </FrostedContentBox>
      <ContentBox sx={{ alignSelf: "flex-start" }}>
        <FlexBox
          sx={{
            flexDirection: "column",
            p: 5,
            gap: 3,
          }}>
          <Box>
            <Typography component="h1" variant="h4">
              {detail.title}
            </Typography>
            {detail.plant_id ? (
              <Typography variant="subtitle1">
                {detail.spec.species.name}
              </Typography>
            ) : (
              <Fragment />
            )}
          </Box>
          <FlexBox sx={{ justifyContent: "space-evenly" }}>
            <Typography component="h2" variant="h6">
              {detail.priceDisplay}
            </Typography>
            {detail.stock ? (
              <Tooltip title="Add to cart">
                <IconButton
                  sx={{ color: siteColors.primaryText }}
                  aria-label="add to cart"
                  size="small"
                  onClick={(evt) => handleAddToCart(detail.id)}>
                  <Icon className="ri-shopping-cart-2-line" />
                </IconButton>
              </Tooltip>
            ) : (
              <Chip
                label={
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500 }}
                    color="primary">
                    Out of Stock
                  </Typography>
                }
              />
            )}
          </FlexBox>
          {detail.spec?.description ? (
            <Typography>{detail.spec.description}</Typography>
          ) : (
            <Fragment />
          )}
          {detail.spec?.details ||
          (detail.dimension && detail.dimension.length) ||
          (detail.planter_id && detail.spec?.material?.material) ? (
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItemText>
                    <Typography variant="caption">
                      {detail.dimension}
                    </Typography>
                  </ListItemText>
                  <ListItemText>
                    <Typography variant="caption">
                      {detail.spec?.material?.material}
                    </Typography>
                  </ListItemText>
                </List>
                <Typography variant="caption">
                  {detail.spec?.details}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Fragment />
          )}
          {detail.plant_id ? (
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Basic Care Requirements</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItemText>
                    <Typography variant="caption">
                      Level: {detail.spec.care.level}
                    </Typography>
                  </ListItemText>
                  <ListItemText>
                    <Typography variant="caption">
                      Watering Frequency: {detail.spec.water.frequency}
                    </Typography>
                  </ListItemText>
                  <ListItemText>
                    <Typography variant="caption">
                      Lighting Requirement: {detail.spec.light.requirement}
                    </Typography>
                  </ListItemText>
                </List>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Fragment />
          )}
          {detail.spec?.plant_guide ? (
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Further Care Guide</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="caption">
                  {detail.spec.plant_guide}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Fragment />
          )}
          {detail.plant_id && detail.spec?.traits ? (
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Other Characteristics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {detail.spec.traits.map((item) => (
                    <ListItemText key={item.id}>
                      <Typography variant="caption">{item.trait}</Typography>
                    </ListItemText>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Fragment />
          )}
          {detail.plant_id ? (
            <Box sx={{ alignSelf: "flex-end" }}>
              <Typography variant="caption">
                * Plant sizes may vary from measurement taken and may not look
                exactly like photos taken
              </Typography>
            </Box>
          ) : (
            <Fragment />
          )}
          {detail.planter_id ? (
            <Box sx={{ alignSelf: "flex-end" }}>
              <Typography variant="caption">
                * Planters color may vary from photos taken due to lighting
                effects used
              </Typography>
            </Box>
          ) : (
            <Fragment />
          )}
        </FlexBox>
      </ContentBox>
    </FlexBox>
  );
}
