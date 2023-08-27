import { useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import Logo from "../image/Golden-Logo-11-1.png";
import { NavItem } from "./nav-item";

//icons
import PermMediaIcon from "@mui/icons-material/PermMedia";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
const items = [
  {
    href: "/",
    icon: <DashboardIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/users",
    icon: <PrecisionManufacturingIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/hairs",
    icon: <RssFeedIcon fontSize="small" />,
    title: "Hairs",
    subMenu: [
      {
        href: "/add-hair",
        icon: <CategoryIcon fontSize="small" />,
        title: "Add Hair",
      },
      {
        href: "/hair-list",
        icon: <NewspaperIcon fontSize="small" />,
        title: "Hair List",
      },
    ],
  },
  {
    href: "/privacy-policy",
    icon: <RssFeedIcon fontSize="small" />,
    title: "Privacy Policy",
  },
  {
    href: "/terms-and-conditions",
    icon: <RssFeedIcon fontSize="small" />,
    title: "Terms & Conditions",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <Image src={Logo} />
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Golden Machinery
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your Admin Panel
                </Typography>
              </div>
              <PrecisionManufacturingIcon
                fontSize="large"
                sx={{
                  color: "gold",
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              subMenu={item.subMenu}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
