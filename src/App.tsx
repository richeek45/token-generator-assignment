import { useState } from 'react'
import './App.css'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type propType = {
  number: string;
  prefix: string;
  row: string;
}

const propMap: propType = {
  number: "number",
  prefix: "string",
  row: "number"
}

const generateVal = (num: number, row: number) => {
  let i = 1;
  const res = [];
  while(i <= num) {
    const temp = [];
    for (let j = 0; j < row; j++) {
      if (i <= num) {
        temp.push(i++);
      }
    }
    res.push(temp);
  }
  return res;
}
 
const defaultValue = { number: 0, prefix: '', row: 0 };

function App() {
  const [blueTokenFields, setBlueTokenFields] = useState(defaultValue);
  const [redTokenFields, setRedTokenFields] = useState(defaultValue);
  const [blueToken, setBlueToken] = useState<number[][]>([[]]);
  const [redToken, setRedToken] = useState<number[][]>([[]]);
  const [generated, setGenerated] = useState(false); 

  const handleGenerateToken = () => {
    const blue = generateVal(blueTokenFields.number, blueTokenFields.row);
    const red = generateVal(redTokenFields.number, redTokenFields.row);
    setBlueToken(blue);
    setRedToken(red);
    setGenerated(true);
  }

  const handleBluetoken = (e: React.ChangeEvent<HTMLInputElement>, prop: keyof propType) => {
    console.log(propMap[prop]);
    setBlueTokenFields(prev => ({ ...prev, [prop]: propMap[prop] === "number" ? e.target.valueAsNumber : e.target.value }))
  }

  const handleRedtoken = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setRedTokenFields(prev => ({ ...prev, [prop]: e.target.value}))
  }

  const handleClearToken = () => {
    setBlueTokenFields(defaultValue);
    setRedTokenFields(defaultValue);
    setGenerated(false);
  }

  return (
   <div className='flex flex-col gap-10'>
    <p>Token Generator</p>
    <div>
      <p className='font-medium text-left uppercase'>Blue Token Fields</p>
      <div className='flex gap-2'>
        <Input type='number' value={blueTokenFields.number} placeholder='Number of blue tokens' onChange={e => handleBluetoken(e, "number")} />
        <Input value={blueTokenFields.prefix} placeholder='Prefix for blue tokens' onChange={e => handleBluetoken(e, "prefix")} />
        <Input type='number' value={blueTokenFields.row} placeholder='Blue tokens per row' onChange={e => handleBluetoken(e, "row")} />
      </div>
    </div>

    <div>
      <p className='font-medium text-left uppercase'>Red Token Fields</p>
      <div className='flex gap-2'>
        <Input value={redTokenFields.number} placeholder='Number of red tokens' onChange={e => handleRedtoken(e, "number")} />
        <Input value={redTokenFields.prefix} placeholder='Prefix for red tokens' onChange={e => handleRedtoken(e, "prefix")} />
        <Input value={redTokenFields.row} placeholder='Red tokens per row' onChange={e => handleRedtoken(e, "row")} />
      </div>
    </div>

    <div className='flex justify-center gap-10'>
      <Button className='w-[300px]' onClick={handleGenerateToken}>Generate Tokens</Button>
      <Button className='w-[300px]' onClick={handleClearToken}>Clear Tokens</Button>
    </div>

    {generated && <Table>
      <TableHeader>
        <TableRow>
          {Array(Number(blueTokenFields.row)).fill(0).map((v, i) => (
            <TableHead className='text-center'>Token {i+1}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {blueToken?.map((row, r) => (
        <TableRow key={r}>
          {row?.map((col, c) => (
            <TableCell key={c} className="font-medium">{blueTokenFields.prefix}{col}</TableCell>
          ))}
        </TableRow>
        ))}
      </TableBody>
    </Table>}

    {generated && <Table>
      <TableHeader>
        <TableRow>
          {Array(Number(redTokenFields.row)).fill(0).map((v, i) => (
            <TableHead className='text-center'>Token {i+1}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {redToken?.map((row, r) => (
        <TableRow key={r}>
          {row?.map((col, c) => (
            <TableCell key={c} className="font-medium">{redTokenFields.prefix}{col}</TableCell>
          ))}
        </TableRow>
        ))}
      </TableBody>
    </Table>}
   </div>
  )
}

export default App