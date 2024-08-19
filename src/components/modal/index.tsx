import { Grid } from "@mui/material";
import { Button, Modal, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import QuantidadePessoa from "../select";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Carregar from "../carregar";

const ModalImport: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [carregar, setCarregar] = useState(true);
  const [valores_padrao, setValores_padrao] = useState({});
  const [convidado, setConvidado] = useState(
    valores_padrao ? Object.keys(valores_padrao).length : ""
  );

  const [fim, setFim] = useState(false);
  const { id } = useParams();
  const {
    formState,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: valores_padrao,
  });
  useEffect(() => {
    if (id)
      axios
        .get(
          "https://us-central1-jhonathanalves-br.cloudfunctions.net/confirmar?id=" +
            id
        )
        .then((r: any) => {
          const valoresPadrao = r?.data?.nomes?.reduce(
            (acc: any, v: any, i: any) => {
              acc[`Nome-${i}`] = v;
              return acc;
            },
            {}
          );
          setValores_padrao(valoresPadrao);
          setConvidado(r?.data?.nomes?.length);
          reset(valoresPadrao);
        })
        .finally(() => setCarregar(false));
  }, [id, reset]);

  const handleOk = (values: any) => {
    setLoading(true);
    const data = Object.keys(values).map((key, i) => {
      if (+i < +convidado) {
        return values[key];
      }
    });
    axios
      .post(
        "https://us-central1-jhonathanalves-br.cloudfunctions.net/confirmar",
        { nomes: data, id: id }
      )
      .then((r: any) => {
        toast.success("Presença confirmada");

        setFim(true);
        setOpen(false);
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (carregar && id)
    return (
      <>
        <Carregar />
      </>
    );
  if (!id)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "4rem",
            borderRadius: "1rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Result status="warning" title="Volte ao convite" />
        </div>
      </div>
    );

  if (!fim && !open)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "4rem",
            borderRadius: "1rem",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Result
            status="info"
            title="Confime sua presença"
            extra={
              <Button
                type="primary"
                key="console"
                style={{ background: "#737373" }}
                onClick={() => setOpen(true)}
              >
                Confirme sua presença
              </Button>
            }
          />
        </div>
      </div>
    );
  return (
    <>
      {!open ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "auto",
          }}
        >
          <iframe
            style={{
              border: 0,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",

              width: "100%",
              height: "100%",
            }}
            allow="fullscreen"
            src="https://www.canva.com/design/DAGOPhiRGxA/8KB4FKCcDVGHLpM97HfMSw/view?embed"
          />
        </div>
      ) : (
        <Modal
          title="Informe o seu nome completo e de seus acompanhantes"
          centered
          open={open}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <form
            onSubmit={handleSubmit(handleOk)}
            style={{ paddingTop: "1rem" }}
          >
            <QuantidadePessoa
              control={control}
              convidados={convidado}
              setConvidados={setConvidado}
            />
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              mt="1.5rem"
            >
              <Grid item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Confirmar
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ margin: "0 8px" }} onClick={handleCancel}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalImport;
