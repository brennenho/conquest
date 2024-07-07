import { Text } from "@mantine/core"
import cn from "classnames"
import React from "react"

import sharedStyles from "~ui/sharedStyles.module.scss"

import styles from "./about.module.scss"

export const AboutView: React.FC = () => {
    return (
        <div>
            <Text fw={500} size="sm" ta="center" className={styles.text}>
                👋 <b>Hey there!</b> <br />
                <br />
                Thanks for using Conquest. This extension is a personal project
                created by USC students{" "}
                <a href="https://brennen.dev" target="_blank">
                    Brennen Ho
                </a>{" "}
                and Austin Tsai.
                <br />
                <br />
                Please feel free to reach out with questions, feedback, feature
                requests, or bug reports by emailing{" "}
                <a href="mailto:conquest@brennen.dev">conquest@brennen.dev</a>.
            </Text>
        </div>
    )
}
