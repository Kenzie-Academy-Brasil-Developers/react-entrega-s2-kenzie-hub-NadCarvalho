import { Box, Typography } from "@material-ui/core";

import Container from "../../Components/Container";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Select from "../../Components/Select";
import List from "../../Components/List";

import * as yup from "yup";
import { useState } from "react";
import { styled } from "@material-ui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { blueGrey } from "@material-ui/core/colors";

const levelList = ["Iniciante", "Intermediário", "Avançado"];

const Username = styled("span")({
  color: blueGrey[500],
  fontWeight: "bold",
  wordBreak: "break-word",
});

const Home = ({ user, onLogout }) => {
  const [techList, setTechList] = useState([
    {
      id: "55126701-18ac-40df-aab9-3a88657db446",
      title: "React",
      status: "Avançado",
    },
    {
      id: "af06a853-c1fb-4a94-960d-1c6caa8d2b5c",
      title: "Typescript",
      status: "Avançado",
    }
  ],);

  const schema = yup.object().shape({
    title: yup.string().min(3, "Invalid Tech").required("Tech required"),
    status: yup
      .string()
      .required("Level required")
      .oneOf(levelList, "Invalid Level"),
  });

  const addTech = (data) => {
    console.log(data);
    setTechList([...techList, {id: Date.now(), ...data}])
  };

  const removeTech = (item) => {
    const filtered = techList.filter(t => t.id !== item);
    setTechList([...filtered])
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Container>
      <Card>
        <Typography variant="subtitle2">
          Welcome, <Username>{user}</Username>
          <Button onClick={onLogout} variant="outlined" size="small">
            Logout
          </Button>
        </Typography>
        <Typography variant="caption" style={{ marginTop: 12}}>
          Add a new tech to your skill collection
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1, mb: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
          onSubmit={handleSubmit(addTech)}
        >
          <Input
            label="Tech"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            size={"small"}
            input={{ ...register("title") }}
          />
          <Select
            label="Level"
            error={Boolean(errors.status)}
            helperText={errors.status?.message}
            select={register("status")}
            menuProps={{ style: { fontSize: "0.8rem" } }}
            defaultValue={""}
            size={"small"}
            items={levelList}
          />
          <Button type="submit" style={{ marginTop: 8, maxWidth: 32 }}>
            Add
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <List items={techList} onRemove={removeTech}/>
        </Box>
      </Card>
    </Container>
  );
};

export default Home;
