import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'StringFields',
  props: FiledPropsDefine,
  setup(props) {

    const handleChange = (e: any) => {
      const value = e.target.value
      props.onChange(value)
    }

    return () => {
      return (
        <input
          type="text"
          value={props.value as string}
          onInput={handleChange}
        />
      )
    }
  },
})
