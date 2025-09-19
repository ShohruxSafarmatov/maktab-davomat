import BoxElement from "../../components/Box";
import Cards from "../../components/Card";
import CardStatisticRes from "../../components/cardStatisticRes";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <BoxElement>
        <Cards />
      </BoxElement>
      <BoxElement>
        <CardStatisticRes />
      </BoxElement>
    </div>
  );
}
