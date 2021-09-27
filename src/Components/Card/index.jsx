import { Card } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { styled } from "@material-ui/styles";

const MyCard = styled(Card)({
  width: "100%",
  maxWidth: "85vw",
  minHeight: "20vh",
  maxHeight: "80vh",
  backgroundColor: blueGrey["50"],
  padding: "32px 8px",
});

const Index = ({ children }) => {
  return (
    <MyCard elevation={12}>
      {children}
    </MyCard>
  );
};

export default Index;
