import React, { useMemo } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { TabView } from "../../components/dashboard/TabView";
import { IChartDatum, TTab } from "../../interfaces";

const filters: CrudFilter[] = [
    {
        field: "start",
        operator: "eq",
        value: dayjs()?.subtract(7, "days")?.startOf("day"),
    },
    {
        field: "end",
        operator: "eq",
        value: dayjs().startOf("day"),
    },
];

export const Dashboard: React.FC = () => {
    const { data: dailyRevenue } = useList<IChartDatum>({
        resource: "dailyRevenue",
        filters,
    });
    const useMemoizedChartData = (d: any) => {
        return useMemo(() => {
            return d?.data?.data?.map((item: IChartDatum) => ({
                date: new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                }).format(new Date(item.date)),
                value: item?.value,
            }));
        }, [d]);
    };

    const memoizedRevenueData = useMemoizedChartData(dailyRevenue);

    const tabs: TTab[] = [
        {
            id: 1,
            label: "",
            content: (
                <ResponsiveAreaChart
                    kpi="Daily revenue"
                    data={memoizedRevenueData}
                    colors={{
                        stroke: "rgb(54, 162, 235)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
    ];

    return (
        <>
            <Stats />
            <TabView tabs={tabs} />
        </>
    );
};
