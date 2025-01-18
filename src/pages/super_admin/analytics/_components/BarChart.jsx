import PropTypes from "prop-types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart } from "recharts";

export function BARCHART ({ data, xDataKey, yDataKey, title}) {
    return (
        <Card className="drop-shadow-2xl">
            <CardHeader>
            <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={yDataKey} fill='#8989D0' />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

BARCHART.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    xDataKey: PropTypes.string.isRequired,
    yDataKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}