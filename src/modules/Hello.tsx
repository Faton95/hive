import React, { FunctionComponent } from 'react'
import { Button } from 'ui-cubic/dist/index.es'
import {Menu} from '../components/Menu'
import {MENU_KEYS} from '../constants/menus'

export type HelloProps = { name: string }

const Hello: FunctionComponent<HelloProps> = () => {
  return (
    <div>
      Odsdsk
      <Menu
        title={'Пользователи'}
        module={MENU_KEYS.REVIEW}
        active={MENU_KEYS.REVIEW}
      />
      <Button>asda</Button>
    </div>
  )
}

export default Hello
