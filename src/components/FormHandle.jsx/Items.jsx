import { Grid, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";

function Items(props) {
  const { id, description, quantity, rate, amount, isDelete } = props;
  const [totalAmount, setTotalAmount] = React.useState(amount);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: id,
      description: description,
      quantity: quantity,
      rate: rate,
      amount: amount,
      isDelete: isDelete,
    },
  });
  const onSubmit = (data) => {
    const totalAmount = data.rate * data.quantity;
    data.amount = totalAmount;
    setTotalAmount(totalAmount);
    props.onItemChange(id, data);
  };

  return (
    <form onChange={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="txtarea"
                rows={3}
                placeholder="Enter item name/description"
              ></textarea>
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="txtbox"
                type="number"
                name="Quantity"
                id=""
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="rate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="txtbox"
                type="number"
                name="Rate"
                id=""
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <h4 className="amount">{totalAmount}</h4>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="delete"
            onClick={() => props.deleteHandler(id)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default Items;
