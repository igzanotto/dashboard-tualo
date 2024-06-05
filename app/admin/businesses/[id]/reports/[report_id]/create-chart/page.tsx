
import ChartForm from "@/components/admin/reports/chart-form/ChartForm";

export default function CreateChartPage({
    params,
  }: {
    params: { id: string };
  }){

    return(
        <div>
            <ChartForm report_id={params.id}/>
        </div>
    )
}