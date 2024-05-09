import { createReport } from "@/app/lib/actions";

export default function CreateReportForm() {
    return (
        <form action={createReport}>
            <label>
                Month:
                <input type="text" name="month" />
            </label>
            <label>
                Company Resume:
                <input type="text" name="company_resume" />
            </label>
            <label>
                Company ID:
                <input type="text" name="company_id" />
            </label>
            <label>
                Goals:
                <input type="text" name="goals" />
            </label>
            <label>
                Analysis:
                <input type="text" name="analysis" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
