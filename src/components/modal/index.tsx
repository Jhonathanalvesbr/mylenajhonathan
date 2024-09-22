import { Grid } from "@mui/material";
import { Button, Modal, Result } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Carregar from "../carregar";
import QuantidadePessoa from "../select";

const ModalImport: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [carregar, setCarregar] = useState(true);
  const [valores_padrao, setValores_padrao] = useState({});
  const [existe, setExiste] = useState(false);
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
          if (valoresPadrao) {
            setExiste(true);
          }
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

    const bloquear30Dias: any = new Set([
      "VGgLo5Y6",
      "8une10og",
      "U1WgQwml",
      "lmcgDVau",
      "WZWC8wf1",
      "yWXR3dac",
      "uklAlC6B",
      "Eok6rfPV",
      "mtWtPZEz",
      "vjVPbTPW",
      "YK2DMOex",
      "QntUIYEi",
      "ZLhDASX3",
      "a9rylWI2",
      "tvj2HION",
      "KdjvCEIK",
      "Dzc4UPmz",
      "sCi9VhA4",
      "sg6zfLg7",
      "JO3Omocg",
      "t8z2EJun",
      "1UVziA3V",
      "yU4Pe8Gk",
      "AeFztSyz",
      "81kmFrwR",
      "hH4motzp",
      "st6Pk8hr",
      "u53iM3KR",
      "2YMQtKup",
      "ZBmtWsWo",
      "DI7EpUej",
      "vmtIRhlH",
      "G9AzqQgV",
      "rDDVj8SM",
      "G3fOv6h4",
      "sdCRjW6U",
      "RA1IVHnh",
      "gjHqpxI5",
      "XyAojiJv",
      "FyoVIiUg",
      "zX78c3Sn",
      "5Kngt5Mf",
      "tEKBiFLE",
      "I9HAurqP",
      "wCrcV0SO",
      "NkrhNadb",
      "1pa1oV0h",
      "SimqpUCd",
      "R16sgPNt",
      "d2Gv9yem",
      "dyn5jQ6P",
      "fUkfHZzU",
      "bRJD1zHr",
      "7o1DzAeR",
      "QdtWg7tK",
      "zlCHp8kd",
      "iy5Qb2YR",
      "J61Azdy3",
      "9JIfBL6U",
      "sI2ZREGF",
      "BRB3pHS8",
      "qWdNEWdq",
      "Xinq49vN",
      "bKArITse",
      "ZeUOuTb2",
      "4GcWVbhx",
      "sHrMuXxl",
      "sBVoZ7JO",
      "1ixtJOjt",
      "pb2qlGdg",
      "oGx5s8jk",
      "FWvNP4rC",
      "veXTM6ZA",
      "UclHhGJs",
      "c3RdfoqA",
      "f2d2TfNQ",
      "X5acesAO",
      "1if9gZVq",
      "DIuWAKwX",
      "2zd2RIou",
      "Hzhlyjpe",
      "x8lKOUwN",
      "tlO0nyoS",
      "KAUaeEHn",
      "fdFmR0uR",
      "x5qvnM3r",
      "t8uo8yuq",
      "pnuFkQE4",
      "T4bFtbP5",
      "FPJIuMBy",
      "L4NIXrfc",
      "rsdm4y3s",
      "irZkY1fu",
      "iQA0C5jx",
      "afP78u94",
      "0IGJeKBA",
      "8J5fgX4h",
      "Gjpm5kNs",
      "eYSlvSYg",
      "mq3UN1Q2",
    ]);

    if (existe === false && bloquear30Dias.has(id)) {
      toast.error("Não foi possível confirmar sua presença");
      return;
    }

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
      .catch(() => toast.success("Erro ao confirmar"))
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
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <Result
            status="info"
            title="Confime a sua presença"
            extra={
              <Button
                type="primary"
                key="console"
                style={{ background: "#737373" }}
                onClick={() => setOpen(true)}
              >
                Confirme a sua presença
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
          }}
        >
          <iframe
            src="https://docs.google.com/viewer?srcid=1B-PcyB8oSrIP0-wOK7zt_k48RAlsKFKl&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
            style={{ border: 0 }}
            width={"100%"}
            height={"100%"}
            allowFullScreen
          />
        </div>
      ) : (
        <Modal
          title="Informe o seu nome completo e o de seus acompanhantes"
          centered
          open={open}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
          styles={{
            content: { backgroundColor: "rgba(255, 255, 255, 0.85)" },
          }}
        >
          <form
            onSubmit={handleSubmit(handleOk)}
            style={{ paddingTop: "1rem" }}
          >
            <QuantidadePessoa
              control={control}
              convidados={convidado}
              setConvidados={setConvidado}
              id={id}
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
