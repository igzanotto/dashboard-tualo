import CreateChartForm from "@/components/admin/create-chart-form";
import ChartForm from "@/components/admin/reports/chart-form/ChartForm";

export default function CreateChartPage({
    params,
  }: {
    params: { id: string };
  }){

    return(
        <div>
            <ChartForm params={params}/>
        </div>
    )
}