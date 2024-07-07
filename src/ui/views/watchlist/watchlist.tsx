import { Button, ScrollArea, Text } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { WatchlistManager } from "~backend/managers"
import { militaryToStandard } from "~backend/utils"
import { WatchlistCourse } from "~ui/components"
import sharedStyles from "~ui/sharedStyles.module.scss"

export const WatchlistView: React.FC = () => {
    const [courses, setCourses] = useState<{ [key: string]: any }>({})
    const [reload, setReload] = useState(false)

    const handleReload = () => {
        setReload(!reload)
    }

    useEffect(() => {
        const getWatchlist = async () => {
            const manager = new WatchlistManager()
            const response = await manager.getWatchlist()
            setCourses(response)
        }
        getWatchlist()
    }, [reload])
    return (
        <ScrollArea h={350} type="auto" scrollbarSize={6}>
            {Object.keys(courses).length === 0 ? (
                <>
                    <Text
                        size="xs"
                        fw={700}
                        ta="center"
                        className={sharedStyles.margin10}>
                        You are not watching any courses.
                    </Text>
                </>
            ) : (
                <>
                    <Text
                        size="xs"
                        fw={700}
                        ta="center"
                        className={sharedStyles.margin10}>
                        Click a course to remove it from your watchlist.
                    </Text>
                    {Object.keys(courses).map((key) => (
                        <WatchlistCourse
                            key={key}
                            name={courses[key]["name"]}
                            professor={courses[key]["professors"]}
                            days={courses[key]["days"]}
                            startTime={militaryToStandard(
                                courses[key]["start_time"]
                            )}
                            endTime={militaryToStandard(
                                courses[key]["end_time"]
                            )}
                            sectionId={key}
                            type={courses[key]["class_type"]}
                            handleReload={handleReload}
                        />
                    ))}
                </>
            )}
        </ScrollArea>
    )
}
