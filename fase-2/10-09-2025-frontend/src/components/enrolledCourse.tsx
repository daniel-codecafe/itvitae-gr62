import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CourseSummaryDTO } from "../types";
import { API_URL } from "../App";

interface EnrolledCourseProps {
    studentId: number;
    courseSummary: CourseSummaryDTO;
}

const EnrolledCourse = ({ studentId, courseSummary }: EnrolledCourseProps) => {

    const queryClient = useQueryClient();

    const unenrollMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/students/${studentId}/courses/${courseSummary.id}`,
                { method: 'DELETE' }
            )

            if (!response.ok) {
                throw new Error("Er is iets fout gegaan");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        }
    })


    const unenrollStudent = () => {
        unenrollMutation.mutate();
    }

    // const abc = true;
    // const xyz = 0;

    // // 1. if-statement
    // if (abc) {
    //     xyz = 123;
    // } else {
    //     xyz = 0;
    // }

    // // 2. Ternary operator
    // xyz = abc ? 123 : 0;

    // // 3. &&

    // xyz = abc && 123;


    return <>
        <h4>{courseSummary.name}</h4>
        {/* <input type="button" value="Afmelden" onClick={() => unenrollStudent()} /> */}

        {unenrollMutation.error && (
            <div>
                Error: {unenrollMutation.error.message}
            </div>
        )}

        <input
            type="button"
            onClick={unenrollStudent}
            value={unenrollMutation.isPending ? 'Bezig...' : 'Afmelden'}
            disabled={unenrollMutation.isPending} />
    </>

}

export default EnrolledCourse;