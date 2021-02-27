import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberFields',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = +e.target.value
      Number.isNaN(value) ? props.onChange(undefined) : props.onChange(value)
    }

    return () => {
      return (
        <input
          type="number"
          value={props.value as number}
          onInput={handleChange}
        />
      )
    }
  },
})
