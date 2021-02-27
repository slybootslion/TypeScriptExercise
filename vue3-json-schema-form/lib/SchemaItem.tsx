import { defineComponent, PropType } from 'vue'
import { FiledPropsDefine, Schema, SchemaTypes } from './types'
import StringFields from './fields/StringFields'
import NumberFields from './fields/NumberFields'

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props
      // todo 如果type没有指定，需要猜测以下type是什么类型
      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING:
          Component = StringFields
          break
        case SchemaTypes.NUMBER:
          Component = NumberFields
          break
        default:
          console.log(`${type} is not supported`)
        // throw new TypeError(`${type} is not supported`)
      }

      return <Component {...props} />
    }
  },
})
