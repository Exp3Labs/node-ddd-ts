import '@/core/koa/server';
import mongoose from '@/core/mongoose/connect';
import { Table } from 'console-table-printer';

(async () => {
  await mongoose();

  const p = new Table({
    columns: [
      { name: 'index', alignment: 'left', color: 'blue' }, //with alignment and color
      { name: 'service', alignment: 'left' }
    ]
  });

  p.addRow({ index: 1, service: 'MongoDB', value: 'OK' }, { color: 'green' });
  p.addRow({ index: 2, service: 'Server', value: 'OK' }, { color: 'green' });
  p.printTable();
})();
