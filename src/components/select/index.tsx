import {Divider, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import * as React from "react";
import {Controller} from "react-hook-form";

export default function QuantidadePessoa({
                                             control,
                                             convidados,
                                             setConvidados,
                                         }: any) {
    const handleChange = (event: SelectChangeEvent) => {
        setConvidados(event.target.value);
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Selecione a quantidade de acompanhantes
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={convidados}
                    label="Selecione a quantidade de acompanhantes"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
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
                            <Divider/>
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
                                            {i === 0 ? "Seu nome completo" : "Nome do acompanhante"}
                                        </p>

                                        <Controller
                                            name={`Nome-${i}`}
                                            control={control}
                                            render={({field: {ref, value, ...field}}) => (
                                                <TextField
                                                    {...field}
                                                    inputRef={ref}
                                                    value={value || ""}
                                                    size="small"
                                                    fullWidth
                                                    required
                                                    placeholder={i === 0 ? "Seu nome completo" : "Nome do acompanhante"}
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
