import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

type TTabViewProps = {
    tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const handleDateRangeChange = (ranges: any) => {
        setSelectedDateRange(ranges.selection);
    };

    return (
        <div className="mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md">
            <div className="tabs">
                {tabs?.map((tab: TTab, index: number) => (
                    <TabItem
                        key={tab?.id}
                        label={tab?.label}
                        isActive={index === activeTab}
                        clickHandler={() => setActiveTab(index)}
                    />
                ))}
            </div>
            <div className="mx-auto">
                {tabs?.map((tab: TTab, index: number) => (
                    <TabPanel key={tab?.id} isActive={index === activeTab}>
                        {tab?.content}
                    </TabPanel>
                ))}
            </div>
            {/* <div className="mx-auto mt-4 absolute right-20 top-100px">
                    <DateRange
                        editableDateInputs={false}
                        onChange={handleDateRangeChange}
                        moveRangeOnFirstSelection={false}
                        ranges={[selectedDateRange]}

                    />
                </div> */}
        </div>
    );
};
