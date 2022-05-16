import React from "react";
import TextInput from "./FormHandle.jsx/TextInput";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import CountrySelect from "./FormHandle.jsx/CountrySelect";
import TextheadlineInput from "./FormHandle.jsx/TextheadlineInput";
import Calender from "./FormHandle.jsx/Calender";
import TableInput from "./FormHandle.jsx/TableInput";
import { Button } from "@mui/material";
import Items from "./FormHandle.jsx/Items";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { green, blue, red } from "@mui/material/colors";
import TextArea from "./FormHandle.jsx/TextArea";
import ImageUpload from "./FormHandle.jsx/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { nanoid } from "nanoid";

function Invoice() {
  const [items, setItems] = React.useState([
    {
      id: nanoid(),
      description: "",
      quantity: 2,
      rate: 100,
      amount: 200,
      isDelete: false,
    },
    {
      id: nanoid(),
      description: "",
      quantity: 0,
      rate: 0,
      amount: 0,
      isDelete: false,
    },
  ]);

  const [tax, setTax] = React.useState(10);

  const [isDiscount, setIsDiscount] = React.useState(false);

  const [isDue, setIsDue] = React.useState(false);

  const [discount, setDiscount] = React.useState(0);

  const [paid, setPaid] = React.useState(0);

  function calculateSubtotal() {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i].amount;
    }
    return sum;
  }
  const displaySubTotal = calculateSubtotal();

  function calculateTax() {
    let totalTax = Number(displaySubTotal * (tax / 100)).toFixed(2);
    return totalTax;
  }
  const Tax = calculateTax();

  const TaxandSubtotal = Number(Number(displaySubTotal) + Number(Tax)).toFixed(
    2
  );

  const Discount = TaxandSubtotal * (discount / 100);

  const Total = TaxandSubtotal - Discount;

  const Due = Total - paid;

  function onAdditem() {
    const itemObject = {
      id: nanoid(),
      description: "",
      quantity: 0,
      rate: 0,
      amount: 0,
      isDelete: false,
    };
    setItems((prevState) => [...prevState, itemObject]);
  }
  function onItemChange(id, data) {
    // console.log("onItemChange clicked with id: " + id);
    setItems((prevItems) => {
      const latestItems = [];
      for (let i = 0; i < prevItems.length; i++) {
        const currentObj = prevItems[i];
        if (currentObj.id === id) {
          const updatedObj = {
            id: id,
            description: data.description,
            quantity: data.quantity,
            rate: data.rate,
            amount: data.amount,
            isDelete: false,
          };
          latestItems.push(updatedObj);
        } else {
          latestItems.push(currentObj);
        }
      }
      return latestItems;
    });
  }
  function onDeleteHandler(id) {
    let updatedItemList = items.filter((itemObj) => itemObj.id !== id);
    setItems(updatedItemList);
  }

  const displayItems = items.map((itemObj) => {
    return (
      <Items
        key={itemObj.id}
        {...itemObj}
        onItemChange={onItemChange}
        deleteHandler={onDeleteHandler}
      />
    );
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      saleTax: "Sale Tax (10%)",
      discount: "Discount (0%)",
      paid: 0,
    },
  });
  const onSubmit = (data) => {
    setPaid(data.paid);
    let str1 = data.saleTax;
    str1 = str1.replace(/\s+/g, "");
    let tax = Number(str1.slice(8, -2));
    setTax(tax);
    let str2 = data.discount;
    str2 = str2.replace(/\s+/g, "");
    let dcnt = Number(str2.slice(9, -2));
    setDiscount(dcnt);
  };
  return (
    <Box py={{ xs: 1, md: 3, lg: 5 }} px={{ xs: 1, lg: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <ImageUpload />
            <input
              className="txtbox"
              type="text"
              name=""
              id=""
              style={{
                fontSize: "22px",
                fontWeight: 600,
              }}
              placeholder="Your Company"
            />
            <TextInput placeholder="Your Name" />
            <TextInput placeholder="Company Address" />
            <TextInput placeholder="City, State, Zip" />
            <CountrySelect />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <input
            className="txtbox"
            type="text"
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              textTransform: "uppercase",
              textAlign: "right",
              color: "#55576B",
            }}
            defaultValue="Invoice"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={6}>
          <Box>
            <input
              className="txtbox"
              type="text"
              name=""
              id=""
              style={{
                fontSize: "18px",
                fontWeight: 600,
              }}
              placeholder="Bill To:"
            />
            <TextInput placeholder="Your Cliant's Name" />
            <TextInput placeholder="Claint's Address" />
            <TextInput placeholder="City, State, Zip" />
            <CountrySelect />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextheadlineInput placeholder="Invoice#" />
              <TextheadlineInput placeholder="Invoice Date" />
              <TextheadlineInput placeholder="Due Date" />
            </Grid>
            <Grid item xs={6}>
              <TextInput placeholder="INV-12" />
              <Calender />
              <Calender />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        mt={5}
        sx={{
          backgroundColor: "#666666",
        }}
      >
        <Grid item xs={4} md={5}>
          <TableInput value="Item Description" />
        </Grid>
        <Grid item xs={2}>
          <TableInput value="Qty" />
        </Grid>
        <Grid item xs={2}>
          <TableInput value="Rate" />
        </Grid>
        <Grid item xs={2}>
          <TableInput value="Amount" />
        </Grid>
      </Grid>
      <Box mt={1}>{displayItems}</Box>
      <Box>
        <Button
          onClick={onAdditem}
          size="small"
          sx={{
            color: green[700],
          }}
          startIcon={<AddCircleIcon />}
        >
          Add Item
        </Button>
      </Box>
      <Grid container spacing={0} mt={1}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <input
                className="txtbox"
                type="text"
                name=""
                id=""
                defaultValue="Sub Total"
                style={{ fontSize: "14px" }}
              />

              <form onChange={handleSubmit(onSubmit)}>
                <Controller
                  name="saleTax"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="txtbox"
                      type="text"
                      name=""
                      id=""
                      style={{ fontSize: "14px" }}
                    />
                  )}
                />
              </form>
              <Box>
                {!isDiscount && (
                  <Button
                    size="small"
                    onClick={() => setIsDiscount(true)}
                    endIcon={<AddCircleIcon />}
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: blue[500],
                      },
                    }}
                  >
                    Discount
                  </Button>
                )}
                {isDiscount && (
                  <form onChange={handleSubmit(onSubmit)}>
                    <Controller
                      name="discount"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="txtbox"
                          type="text"
                          name=""
                          id=""
                          style={{ fontSize: "14px" }}
                        />
                      )}
                    />
                  </form>
                )}
              </Box>
            </Grid>
            <Grid item xs={5} md={6}>
              <h4 className="value">{displaySubTotal}</h4>
              <h4 className="value">{Tax}</h4>
              {isDiscount && <h4 className="value">{Discount}</h4>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={5} md={6}></Grid>
        <Grid item xs={7} md={6}>
          <Grid container spacing={0} sx={{ backgroundColor: "#E3E3E3" }} p={1}>
            <Grid item xs={5} md={6}>
              <input
                className="total"
                type="text"
                name=""
                id=""
                defaultValue="TOTAL"
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="center" spacing={0}>
                <Grid item xs={5}>
                  <input
                    className="currencyBox"
                    type="text"
                    name=""
                    id=""
                    placeholder="$"
                  />
                </Grid>
                <Grid item xs={6}>
                  <h3 className="value">{Total}</h3>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {!isDue && (
            <Button
              size="small"
              onClick={() => setIsDue(true)}
              endIcon={<AddCircleIcon />}
              sx={{
                marginTop: "5px",
                color: "white",
                "&:hover": {
                  color: red[500],
                },
              }}
            >
              Due
            </Button>
          )}

          {isDue && (
            <Box>
              <Grid container spacing={0}>
                <Grid item xs={5}>
                  <TextheadlineInput placeholder="Paid:" />
                </Grid>
                <Grid item xs={7}>
                  <Grid container justifyContent="center" spacing={0}>
                    <Grid item xs={5}>
                      <input
                        className="txtbox"
                        style={{
                          textAlign: "right",
                        }}
                        type="text"
                        name=""
                        id=""
                        placeholder="$"
                      />
                    </Grid>
                    <Grid item xs={7}>
                      {/* paid  */}
                      <form onChange={handleSubmit(onSubmit)}>
                        <Controller
                          name="paid"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="txtbox"
                              type="text"
                              name=""
                              id=""
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                textAlign: "right",
                              }}
                            />
                          )}
                        />
                      </form>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={0}>
                <Grid item xs={5}>
                  <TextheadlineInput placeholder="Due:" />
                </Grid>
                <Grid item xs={7}>
                  <Grid container justifyContent="center" spacing={0}>
                    <Grid item xs={5}>
                      <input
                        className="txtbox"
                        style={{
                          textAlign: "right",
                        }}
                        type="text"
                        name=""
                        id=""
                        placeholder="$"
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <h4
                        className="value"
                        style={{
                          color: "gray",
                          fontSize: "17px",
                        }}
                      >
                        {Due}
                      </h4>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box mt={2}>
        <TextheadlineInput placeholder="Notes" />
        <TextArea placeholder="It was great doing business with you." />
      </Box>
      <Box>
        <TextheadlineInput placeholder="Terms & Conditions" />
        <TextArea placeholder="Please make the payment by the due date." />
      </Box>
    </Box>
  );
}

export default Invoice;
