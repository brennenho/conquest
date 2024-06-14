import cn from "classnames"
import React from "react"

import { Subtitle } from "../../components/subtitle"
import sharedStyles from "../../sharedStyles.module.scss"
import styles from "./login.module.scss"

export const LoginView: React.FC<{ switchView: (view: string) => void }> = ({
  switchView
}) => {
  return (
    <div
      className={cn(
        sharedStyles.fullWidth,
        sharedStyles.fullHeight,
        sharedStyles.flexCentered,
        sharedStyles.flexColumn
      )}>
      <Subtitle text="Conquest" />
      <p>Please enter your USC email.</p>
      <input type="text" placeholder="USC email" className={styles.input} />
    </div>
  )
}
