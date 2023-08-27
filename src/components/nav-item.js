import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem, Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useState } from "react";

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      {props.subMenu ? (
        <>
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: active && "rgba(255,255,255, 0.08)",
              borderRadius: 1,
              color: active ? "secondary.main" : "neutral.300",
              fontWeight: active && "fontWeightBold",
              justifyContent: "flex-start",
              px: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: active ? "secondary.main" : "neutral.400",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
            onClick={handleClick}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
            <Box sx={{ flexGrow: 1 }}>
              {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              {/* <ExpandCircleDownIcon/> */}
            </Box>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            elevation={0}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {props.subMenu.map((r, i) => {
              return (
                <NextLink href={r.href} passHref key={i}>
                  <MenuItem key={i} onClick={handleClose}>
                    <ListItemIcon>{r.icon}</ListItemIcon>
                    <ListItemText>{r.title}</ListItemText>
                  </MenuItem>
                </NextLink>
              );
            })}
          </Menu>
        </>
      ) : (
        <NextLink href={href} passHref>
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: active && "rgba(255,255,255, 0.08)",
              borderRadius: 1,
              color: active ? "secondary.main" : "neutral.300",
              fontWeight: active && "fontWeightBold",
              justifyContent: "flex-start",
              px: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: active ? "secondary.main" : "neutral.400",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
            // onClick={handleClick}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </Button>
        </NextLink>
      )}
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
