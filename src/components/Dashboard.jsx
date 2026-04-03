import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import one from "../assests/3.png";
import two from "../assests/1.png";
import three from "../assests/4.png";
import four from "../assests/2.png";
import { IoCalendarOutline } from "react-icons/io5";
import TotalCasesChart from "./TotalCasesChart";
import PortfolioChart from "./PortfolioChart";
import ChannelsChart from "./ChannelsChart";
import NewCustomerChannelsChart from "./NewCustomerChannelsChart";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import upload from "../assests/upload.png";
import calendar from "../assests/calendar.png";
import { HiOutlineRefresh } from "react-icons/hi";
import filter from "../assests/filter.png";
import refresh from "../assests/refresh-button.png";
import edit from "../assests/edit.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./SpinLoader"; // Import the Loader component
import "../Styles/SpinLoader.css"; // Import your CSS styles
import dayjs from "dayjs";
const steps = [
  "Fetching Data",
  "Updating NAV Values",
  "Identifying Shares",
  "Updating New Profile Values",
  "Calculating LTV",
  "Calculating Margin Breach",
  "Updating Dashboard",
];
const Dashboard = () => {
  //my changes
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  //my changes
  const [cardData, setcardData] = useState({
    fund: 10,
    additional: 6,
    partial: 8,
    completed: 30,
  });
  const [portfoliodata, setportfoliodata] = useState({
    breached: 75,
    under: 10,
    within: 15,
  });
  const [branchdata, setbranchdata] = useState({
    pb: 75,
    saket: 30,
    green: 50,
    pitam: 20,
    noida: 60,
  });
  const [channeldata, setchanneldata] = useState({
    shares: 80,
    fund: 35,
  });
  const [channeldata1, setchanneldata1] = useState({
    shares: 58,
    fund: 37,
  });
  // const [collateraldata,setcollateraldata] = useState([]);
  // const [partialSeldata,setpartialSeldata] = useState([]);
  // const [completedSelldata,setcompletedSelldata] = useState([]);
  const refreshPage = () => {
    //loader code

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      setcardData({
        fund: 8,
        additional: 4,
        partial: 7,
        completed: 32,
      });
      setportfoliodata({
        breached: 70,
        under: 15,
        within: 20,
      });
      setbranchdata({
        pb: 80,
        saket: 40,
        green: 65,
        pitam: 30,
        noida: 55,
      });
      setchanneldata({
        shares: 90,
        fund: 50,
      });
    }, 15000);
  };
  const { portfolioHealth } = useSelector((state) => state.portfolioSummary);
  const dispatch = useDispatch();
  const dispatchAction = (
    funddata,
    collateraldata,
    partialSeldata,
    completedSelldata,
    portfolioHealthdata,
    firstNotice,
    secondNotice,
    marginUnderReview,
  ) => {
    dispatch({
      type: "fundAction",
      payload: funddata,
    });
    dispatch({
      type: "collateralAction",
      payload: collateraldata,
    });
    dispatch({
      type: "partialSellAction",
      payload: partialSeldata,
    });
    dispatch({
      type: "completedSellAction",
      payload: completedSelldata,
    });
    dispatch({
      type: "portfolioHealthAction",
      payload: portfolioHealthdata,
    });
    dispatch({
      type: "firstNotice",
      payload: firstNotice,
    });
    dispatch({
      type: "secondNotice",
      payload: secondNotice,
    });
    dispatch({
      type: "marginUnderReview",
      payload: marginUnderReview,
    });

    console.log("portfolioHealthdata", portfolioHealthdata);
  };

  useEffect(() => {
    //chetan loader
    if (loading) {
      let stepIndex = 0;
      const interval = 15000 / steps.length; // Total 5 seconds divided by number of steps

      const intervalId = setInterval(() => {
        setCurrentStep(stepIndex);
        stepIndex += 1;
        if (stepIndex >= steps.length) {
          clearInterval(intervalId);
        }
      }, interval);

      return () => clearInterval(intervalId);
    }
    //chetan loader

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=FUND_DEPOSITED",
        );
        console.log(data);
        var data1 = data;
        data1.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=ADDITIONAL_COLLATERAL_DEPOSITED",
        );
        console.log(data);
        var data2 = data;
        data2.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=PARTIAL_SELL",
        );
        console.log(data);
        var data3 = data;
        data3.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=FULL_SELL",
        );
        console.log(data);
        var data4 = data;
        data4.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=MARGIN_BREACHED",
        );
        console.log(data);
        var data5 = data;
        data5.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=FIRST_NOTICE_INITIATED",
        );
        console.log(data);
        var data6 = data;
        data6.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=SECOND_NOTICE_INITIATED",
        );
        console.log(data);
        var data7 = data;
        data7.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.get(
          "https://csgrlosdemo.newgensoftware.net:8443/lasportalbackendservices/?status=MARGIN_UDER_REVIEW",
        );
        console.log(data);
        var data8 = data;
        data8.map((e, i) => (e["id"] = i + 1));
      } catch (error) {
        console.log(error);
      }

      dispatchAction(data1, data2, data3, data4, data5, data6, data7, data8);
    };
    fetchData();
  }, [loading]);

  return (
    <>
      <Grid container spacing={2} bgcolor={"#EEF2F7"} pr={2}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              background: "linear-gradient(90deg, #0d2d54 0%, #1a4a82 100%)",
              borderRadius: "16px",
              px: 3,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 18px rgba(13,45,84,0.18)",
            }}
          >
            <div>
              <Typography
                fontFamily={"'DM Sans', sans-serif"}
                fontSize={"22px"}
                fontWeight={"400"}
                color={"white"}
                lineHeight={1.2}
              >
                Dashboard
              </Typography>
              <Typography
                fontFamily={"'DM Sans', sans-serif"}
                fontSize={"12px"}
                color={"rgba(255,255,255,0.55)"}
                letterSpacing={"0.2px"}
              >
                Loan Against Securities — Overview
              </Typography>
            </div>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              {/* Date pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "8px",
                  padding: "7px 14px",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                <IoCalendarOutline size={16} />
                {dayjs().format("MMMM DD, YYYY")}
              </div>

              {/* Refresh */}
              <button
                title="Refresh data"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={refreshPage}
              >
                <HiOutlineRefresh color="white" size={18} />
              </button>

              {/* Upload */}
              <button
                title="Upload Excel"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
                onClick={() => document.getElementById("hiddenUpload").click()}
              >
                <img
                  src={upload}
                  alt="upload"
                  width={18}
                  height={18}
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
                />
                <input
                  type="file"
                  name="uploadexcel"
                  id="hiddenUpload"
                  style={{ display: "none" }}
                />
              </button>

              {/* Filter */}
              <button
                title="Filter"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={filter}
                  alt="filter"
                  width={18}
                  height={18}
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
                />
              </button>

              {/* Edit */}
              <button
                title="Edit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={edit}
                  alt="edit"
                  width={18}
                  height={18}
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
                />
              </button>
            </Stack>
          </Box>
        </Grid>
        {[
          {
            to: "/dashboard/fundDeposited",
            icon: one,
            label: "Fund Deposited",
            value: cardData.fund,
            accent: "#27ae60",
            grad: "linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)",
          },
          {
            to: "/dashboard/collateral",
            icon: two,
            label: "Additional Collateral",
            value: cardData.additional,
            accent: "#E8A838",
            grad: "linear-gradient(135deg, #0d2d54 0%, #1a4a82 100%)",
          },
          {
            to: "/dashboard/partialSell",
            icon: three,
            label: "Partial Sell",
            value: cardData.partial,
            accent: "#C0392B",
            grad: "linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)",
          },
          {
            to: "/dashboard/completedSell",
            icon: four,
            label: "Completed Sell",
            value: cardData.completed,
            accent: "#27ae60",
            grad: "linear-gradient(135deg, #0d2d54 0%, #1a4a82 100%)",
          },
        ].map(({ to, icon, label, value, accent, grad }) => (
          <Grid item xs={6} md={3} key={label}>
            <Link to={to} style={{ textDecoration: "none" }}>
              <Card
                style={{
                  background: grad,
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 4px 18px rgba(13,45,84,0.22)",
                  transition: "transform 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <CardContent style={{ padding: "20px 20px 16px" }}>
                  <Stack spacing={1.5}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <div
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={icon}
                          alt=""
                          width={"24px"}
                          height={"24px"}
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
                      </div>
                      {/* <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}` }} /> */}
                      <Typography
                        fontFamily={"'DM Sans', sans-serif"}
                        fontSize={"18px"}
                        fontWeight={"500"}
                        color={"rgba(255,255,255,0.75)"}
                        letterSpacing={"0.3px"}
                      >
                        {label}
                      </Typography>
                    </Stack>
                    <Typography
                      fontFamily={"'DM Sans', sans-serif"}
                      fontSize={"32px"}
                      fontWeight={"400"}
                      color={"white"}
                      lineHeight={1.1}
                    >
                      {value}
                    </Typography>
                    {/* <Typography
                      fontFamily={"'DM Sans', sans-serif"}
                      fontSize={'12px'}
                      fontWeight={'500'}
                      color={'rgba(255,255,255,0.75)'}
                      letterSpacing={'0.3px'}
                    >
                      {label}
                    </Typography> */}
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <Link to={"/portfolioHealth"} style={{ textDecoration: "none" }}>
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                border: "1px solid #e4edf8",
              }}
            >
              <CardContent>
                <PortfolioChart portfoliodata={portfoliodata} portfolioHealthdata={portfolioHealth} />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={"/totalCaseTable"} style={{ textDecoration: "none" }}>
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                border: "1px solid #e4edf8",
              }}
            >
              <CardContent>
                <TotalCasesChart
                  barSize={"30"}
                  tick={false}
                  branchdata={branchdata}
                />
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={2}>
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                border: "1px solid #e4edf8",
              }}
            >
              <CardContent>
                <ChannelsChart channeldata={channeldata} />
              </CardContent>
            </Card>
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                border: "1px solid #e4edf8",
              }}
            >
              <CardContent>
                <NewCustomerChannelsChart channeldata={channeldata1} />
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container xs={12} md={12} spacing={2}>
            {/* Customer 360 */}
            <Grid item xs={6}>
              <Card
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  border: "1px solid #e4edf8",
                  height: "100%",
                }}
              >
                <CardContent style={{ padding: "20px" }}>
                  <Typography
                    fontFamily={"'DM Sans', sans-serif"}
                    fontSize={"16px"}
                    fontWeight={"400"}
                    color={"#1a3a5c"}
                    mb={1.5}
                  >
                    Customer 360
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={1.5}
                    mb={1.5}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #1a4a82, #2563a8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <PersonOutlineOutlinedIcon style={{ color: "white", fontSize: 26 }} />
                    </div>
                    <div>
                      <Typography
                        fontFamily={"'DM Sans', sans-serif"}
                        fontSize={12}
                        color={"#6b7d96"}
                      >
                        Search & view
                      </Typography>
                      <Typography
                        fontFamily={"'DM Sans', sans-serif"}
                        fontSize={13}
                        fontWeight={600}
                        color={"#1a3a5c"}
                      >
                        Customer Profile
                      </Typography>
                    </div>
                  </Stack>
                  <button
                    style={{
                      background:
                        "linear-gradient(135deg, #1a4a82 0%, #2563a8 100%)",
                      color: "white",
                      border: "none",
                      height: "38px",
                      borderRadius: "8px",
                      width: "100%",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(37,99,168,0.2)",
                    }}
                    onClick={() =>
                      window.open(
                        "https://hnbdemo.newgensoftware.net/LASMonitoring/#/customer",
                      )
                    }
                  >
                    Search Customer
                  </button>
                </CardContent>
              </Card>
            </Grid>

            {/* Notice badges */}
            <Grid item xs={6}>
              <Stack direction={"column"} gap={1.5} height={"100%"}>
                <Link
                  to={"/dashboard/secondNotice"}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{
                      borderRadius: "12px",
                      border: "1px solid #fcd0cc",
                      boxShadow: "0 2px 8px rgba(192,57,43,0.08)",
                    }}
                  >
                    <CardContent
                      style={{
                        backgroundColor: "#fff5f4",
                        padding: "14px 16px",
                      }}
                    >
                      <Stack direction={"row"} gap={1.5} alignItems={"center"}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            background: "#C0392B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 16,
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            2
                          </span>
                        </div>
                        <div>
                          <Typography
                            fontFamily={"'DM Sans', sans-serif"}
                            fontSize={13}
                            fontWeight={600}
                            color={"#C0392B"}
                          >
                            Second Notice
                          </Typography>
                          <Typography
                            fontFamily={"'DM Sans', sans-serif"}
                            fontSize={11}
                            color={"#9aabb8"}
                          >
                            Urgent action required
                          </Typography>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
                <Link
                  to={"/dashboard/firstNotice"}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{
                      borderRadius: "12px",
                      border: "1px solid #d0e4f7",
                      boxShadow: "0 2px 8px rgba(37,99,168,0.07)",
                    }}
                  >
                    <CardContent
                      style={{
                        backgroundColor: "#f0f6ff",
                        padding: "14px 16px",
                      }}
                    >
                      <Stack direction={"row"} gap={1.5} alignItems={"center"}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            background: "#2563a8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 16,
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            1
                          </span>
                        </div>
                        <div>
                          <Typography
                            fontFamily={"'DM Sans', sans-serif"}
                            fontSize={13}
                            fontWeight={600}
                            color={"#2563a8"}
                          >
                            First Notice
                          </Typography>
                          <Typography
                            fontFamily={"'DM Sans', sans-serif"}
                            fontSize={11}
                            color={"#9aabb8"}
                          >
                            Follow-up pending
                          </Typography>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Stack>
            </Grid>

            {/* Highlighted Profiles */}
            <Grid item xs={12}>
              <Card
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  border: "1px solid #e4edf8",
                }}
              >
                <CardContent style={{ padding: "20px" }}>
                  <Typography
                    fontFamily={"'DM Sans', sans-serif"}
                    fontSize={"17px"}
                    color={"#1a3a5c"}
                    mb={1.5}
                    style={{
                      borderBottom: "1px solid #f0f4fa",
                      paddingBottom: 10,
                    }}
                  >
                    Highlighted Profiles
                  </Typography>
                  <Stack spacing={1.5}>
                    {/* 3 Days Deadline */}
                    <Link
                      to={"/dashboard/secondNotice"}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          borderRadius: "12px",
                          border: "1px solid #fcd0cc",
                          cursor: "pointer",
                        }}
                      >
                        <CardContent
                          style={{
                            backgroundColor: "#fff5f4",
                            padding: "12px 16px",
                          }}
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Stack direction={"column"} gap={0.3}>
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignSelf: "flex-start",
                                  backgroundColor: "#C0392B",
                                  borderRadius: "4px",
                                  padding: "1px 8px",
                                  marginBottom: 4,
                                }}
                              >
                                <Typography
                                  fontFamily={"'DM Sans', sans-serif"}
                                  color={"white"}
                                  fontSize={"10px"}
                                  fontWeight={"700"}
                                  letterSpacing={"0.3px"}
                                >
                                  Due in 3 Days
                                </Typography>
                              </div>
                              <Typography
                                fontFamily={"'DM Sans', sans-serif"}
                                fontSize={13}
                                fontWeight={600}
                                color={"#1a3a5c"}
                              >
                                Cases with 3 Days Deadline
                              </Typography>
                              <Typography
                                fontFamily={"'DM Sans', sans-serif"}
                                fontSize={22}
                                color={"#C0392B"}
                                lineHeight={1.1}
                              >
                                9
                              </Typography>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={1.5}
                            >
                              <div
                                style={{
                                  width: 44,
                                  height: 44,
                                  borderRadius: "10px",
                                  backgroundColor: "#fff0ee",
                                  border: "1px solid #fcd0cc",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <AccessAlarmsOutlinedIcon style={{ color: "#C0392B", fontSize: 24 }} />
                              </div>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Link>

                    {/* 5 Days Deadline */}
                    <Link
                      to={"/dashboard/firstNotice"}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          borderRadius: "12px",
                          border: "1px solid #c8ebd4",
                          cursor: "pointer",
                        }}
                      >
                        <CardContent
                          style={{
                            backgroundColor: "#f2faf4",
                            padding: "12px 16px",
                          }}
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Stack direction={"column"} gap={0.3}>
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignSelf: "flex-start",
                                  backgroundColor: "#27ae60",
                                  borderRadius: "4px",
                                  padding: "1px 8px",
                                  marginBottom: 4,
                                }}
                              >
                                <Typography
                                  fontFamily={"'DM Sans', sans-serif"}
                                  color={"white"}
                                  fontSize={"10px"}
                                  fontWeight={"700"}
                                  letterSpacing={"0.3px"}
                                >
                                  Due in 5 Days
                                </Typography>
                              </div>
                              <Typography
                                fontFamily={"'DM Sans', sans-serif"}
                                fontSize={13}
                                fontWeight={600}
                                color={"#1a3a5c"}
                              >
                                Cases with 5 Days Deadline
                              </Typography>
                              <Typography
                                fontFamily={"'DM Sans', sans-serif"}
                                fontSize={22}
                                color={"#27ae60"}
                                lineHeight={1.1}
                              >
                                16
                              </Typography>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={1.5}
                            >
                              <div
                                style={{
                                  width: 44,
                                  height: 44,
                                  borderRadius: "10px",
                                  backgroundColor: "#f2faf4",
                                  border: "1px solid #c8ebd4",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <ScheduleOutlinedIcon style={{ color: "#27ae60", fontSize: 24 }} />
                              </div>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Link>

                    {/* Margin Under Review */}
                    <Link
                      to={"/dashboard/marginUnderReview"}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          borderRadius: "12px",
                          border: "1px solid #f5e4b0",
                          cursor: "pointer",
                        }}
                      >
                        <CardContent
                          style={{
                            backgroundColor: "#fffbee",
                            padding: "12px 16px",
                          }}
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Stack direction={"column"} gap={0.3}>
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignSelf: "flex-start",
                                  backgroundColor: "#E8A838",
                                  borderRadius: "4px",
                                  padding: "1px 8px",
                                  marginBottom: 4,
                                }}
                              >
                                <Typography
                                  fontFamily={"'DM Sans', sans-serif"}
                                  color={"white"}
                                  fontSize={"10px"}
                                  fontWeight={"700"}
                                  letterSpacing={"0.3px"}
                                >
                                  Under Review
                                </Typography>
                              </div>
                              <Typography
                                fontFamily={"'DM Sans', sans-serif"}
                                fontSize={13}
                                fontWeight={600}
                                color={"#1a3a5c"}
                              >
                                Margin Under Review
                              </Typography>
                              <Typography
                                fontFamily={"'DM Sans', sans-serif"}
                                fontSize={22}
                                color={"#E8A838"}
                                lineHeight={1.1}
                              >
                                12
                              </Typography>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={1.5}
                            >
                              <div
                                style={{
                                  width: 44,
                                  height: 44,
                                  borderRadius: "10px",
                                  backgroundColor: "#fffbee",
                                  border: "1px solid #f5e4b0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <PendingActionsOutlinedIcon style={{ color: "#E8A838", fontSize: 24 }} />
                              </div>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Link>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Loader open={loading} steps={steps} currentStep={currentStep} />
    </>
  );
};

export default Dashboard;
