import { Box, Typography } from "@material-ui/core";

import Container from "../../Components/Container";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Select from "../../Components/Select";
import List from "../../Components/List";

import * as yup from "yup";
import { useState, useEffect } from "react";
import { styled } from "@material-ui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { blueGrey } from "@material-ui/core/colors";
import { addTechUserRequest, getUserInfoRequest, removeTechUserRequest } from "../../Api";

const levelList = ["Iniciante", "Intermediário", "Avançado"];

const Username = styled("span")({
  color: blueGrey[500],
  fontWeight: "bold",
  wordBreak: "break-word",
});

const Home = ({ loggedData, updateUser, onLogout }) => {
  const { user, token } = loggedData;
  const [techList, setTechList] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().min(3, "Invalid Tech").required("Tech required"),
    status: yup
      .string()
      .required("Level required")
      .oneOf(levelList, "Invalid Level"),
  });

  const addTech = (data) => {
    console.log('TECH_FORM', data);
    addTechUserRequest(data, token).then((response) => {
      console.log('TECH_ADD', response);
      setTechList([...techList, response.data])
    }).catch(error => {
      console.error('TECH_ADD_FAILED', error);
      let message = 'Failed to add tech to user!'
      if (error?.response?.data?.message) {
        message = error?.response?.data?.message;
      }
      alert(message);
    })
  };

  const removeTech = (item) => {
    console.log('TECH_ID', item);
    removeTechUserRequest(item, token).then((response) => {
      console.log('TECH_DEL', response);
      const filtered = techList.filter(t => t.id !== item);
      setTechList([...filtered])
    }).catch(error => {
      console.error('TECH_DEL_FAILED', error);
      let message = 'Failed to remove tech from user!'
      if (error?.response?.data?.message) {
        message = error?.response?.data?.message;
      }
      alert(message);
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    getUserInfoRequest(user.id).then(response => {
      console.log('USERINFO', response);
      updateUser(response.data);
      setTechList(response.data.techs);
    }).catch(error => {
      console.error('USERINFO_FAILED', error);
      let message = 'Failed to retrieve user!'
      if (error?.response?.data?.message) {
        message = error?.response?.data?.message;
      }
      alert(message);
    })
  }, [])

  return (
    <Container>
      <Card>
        <Typography variant="subtitle2">
          Welcome, <Username>{user.name}</Username>
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
