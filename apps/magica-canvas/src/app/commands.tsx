import { randomIntBetween } from 'misc-utils-of-mine-generic'
import { Field, State } from './state'

export interface Command {
  name: string
  command: (state: State) => string
  fields: Field[]
}

export const commands: Command[] = [

  {
    name: 'implode',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -implode  ${state.fields['implode'].value} ) -flatten output.rgba`,
    fields: [{ id: 'implode', value: '2' }, { id: 'size', value: '180' }]
  },
  {
    name: 'explode',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -implode  ${state.fields['implode'].value} ) -flatten output.rgba`,
    fields: [{ id: 'implode', value: '-2' }, { id: 'size', value: '180' }]
  },
  {
    name: 'swirl',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -swirl  ${state.fields['swirl'].value} ) -flatten output.rgba`,
    fields: [{ id: 'swirl', value: '244' }, { id: 'size', value: '180' }]
  },
  {
    name: 'barrel',
    command: state => `convert ${state.inputFile.name} -matte -virtual-pixel transparent -distort Barrel '${[state.fields['a'].value, state.fields['b'].value, state.fields['c'].value, state.fields['d'].value, state.x, state.y].join(' ')}' output.rgba`,
    fields: [{ id: 'a', value: '-0.4' }, { id: 'b', value: '0.7' }, { id: 'c', value: '0.2' }, { id: 'd', value: '0.5' }]
  },
  {
    name: 'scale',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} +repage  -distort ScaleRotateTranslate '${state.fields['scale'].value}  0'  -geometry +${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} ) -composite  output.rgba`,
    fields: [{ id: 'scale', value: '3' }, { id: 'size', value: '80' }]
  },
  {
    name: 'wave',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -background none -wave  ${state.fields['wave'].value} ) -flatten output.rgba`,
    fields: [{ id: 'wave', value: '10x64' }, { id: 'size', value: '180' }]
  },
  {
    name: 'blur',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)}  -blur  ${state.fields['blur'].value} ) -flatten output.rgba`,
    fields: [{ id: 'blur', value: '4x2' }, { id: 'size', value: '180' }]
  },
  {
    name: 'spread',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -spread  ${state.fields['spread'].value} ) -flatten output.rgba`,
    fields: [{ id: 'spread', value: '5' }, { id: 'size', value: '180' }]
  },
  {
    name: 'rotate',
    command: state => `convert  ${state.inputFile.name} -rotate ${state.x + state.y} output.rgba`,
    fields: []
  },
  {
    name: 'distort perspective',
    command: state => {
      function R(n: number) {
        return randomIntBetween(-n, n)
      }
      function N(n: number, m: number) {
        return n ? randomIntBetween(n - m, n + m) : 0
      }
      const D = 3, M = N(100, 5)
      return `convert ${state.inputFile.name} -matte -virtual-pixel transparent -distort perspective '${N(10, 5)},${N(10, 5)} ${Math.round(state.x / (D + R(D / 4)))},${Math.round(state.y / (D + R(D / 4)))}      0,${M} ${Math.round(state.x / (D + R(D / 4)))},${state.y + R(D)}      ${M},${M} ${state.x + R(D)},${state.y + R(D)}         ${M},0 ${state.x + R(D)},${Math.round(state.y / (D + R(D / 4)))}' output.rgba`
    },
    fields: []
  },
  {
    name: 'color histogram',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -size 1x2  gradient:blue-red -fx  'v.p{0,1}+(v.p{0,0}-v.p{0,1})*u^${state.fields['factor'].value}' ) -flatten output.rgba`,
    fields: [{ id: 'factor', value: '1.3' }, { id: 'size', value: '50' }]
  },
  {
    name: 'sepia',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)}   -color-matrix ' 0.393 0.769 0.189    0.349 0.686 0.168    0.272 0.534 0.131  ' ) -flatten output.rgba`,
    fields: [{ id: 'size', value: '180' }]
  },
  {
    name: 'vignette',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -background black -vignette ${state.fields['vignette'].value} ) -flatten output.rgba`,
    fields: [{ id: 'vignette', value: '0x13' }, { id: 'size', value: '180' }]
  },
  {
    name: 'charcoal',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -alpha remove -charcoal ${state.fields['charcoal'].value} -fill ${state.fields['fill'].value}  -tint 80% ) -flatten output.rgba`,
    fields: [{ id: 'charcoal', value: '4' },{ id: 'fill', value: 'red' }, { id: 'size', value: '130' }]
  },

  {
    name: 'paint',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -paint ${state.fields['paint'].value} ) -flatten output.rgba`,
    fields: [{ id: 'paint', value: '4' }, { id: 'size', value: '120' }]
  },

  {
    name: 'paint morphology',
    command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x - Math.round(parseInt(state.fields['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fields['size'].value) / 2)} -morphology OpenI Disk:${state.fields['disk'].value} ) -flatten output.rgba`,
    fields: [{ id: 'disk', value: '3.5' }, { id: 'size', value: '120' }]
  },

  
]
