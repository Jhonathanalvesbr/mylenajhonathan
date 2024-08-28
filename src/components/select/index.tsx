import { Divider, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { Controller } from "react-hook-form";

export default function QuantidadePessoa({
  control,
  convidados,
  setConvidados,
  id,
}: any) {
  const handleChange = (event: SelectChangeEvent) => {
    setConvidados(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Selecione a quantidade de pessoas
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={convidados}
          label="Selecione a quantidade de pessoas"
          onChange={handleChange}
        >
          {[...Array(id === "u53iM3KR" ? 10 : 5)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {convidados !== "" ? (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          mt=".5rem"
        >
          {convidados && convidados !== "" ? (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          ) : (
            ""
          )}
          {convidados && convidados !== "" ? (
            <>
              {[...Array(convidados)].map((_, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        paddingBottom: ".5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {i === 0
                        ? "Seu nome completo"
                        : "Nome do acompanhante completo"}
                    </p>

                    <Controller
                      name={`Nome-${i}`}
                      control={control}
                      render={({ field: { ref, value, ...field } }) => (
                        <TextField
                          {...field}
                          inputRef={ref}
                          value={value || ""}
                          size="small"
                          fullWidth
                          required
                          placeholder={
                            i === 0
                              ? "Seu nome completo"
                              : "Nome do acompanhante completo"
                          }
                          type="text"
                          InputLabelProps={{
                            shrink: value ? true : false,
                          }}
                        />
                      )}
                    />
                  </Grid>
                );
              })}
            </>
          ) : (
            ""
          )}
        </Grid>
      ) : (
        ""
      )}
    </Box>
  );
}
