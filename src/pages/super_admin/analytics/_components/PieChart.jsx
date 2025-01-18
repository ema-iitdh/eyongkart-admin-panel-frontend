import PropTypes from "prop-types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, ResponsiveContainer, Tooltip, PieChart } from "recharts";

const COLORS = ['#E06666', '#00C49F', '#ddb844', '#4A8ECC', '#8884D8', '#82ca9d'];

export function PIECHART({ title, data, dataKey, nameKey }) {
    return (
        <Card className="drop-shadow-2xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
}

PIECHART.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataKey: PropTypes.string.isRequired,
    nameKey: PropTypes.string.isRequired,
}