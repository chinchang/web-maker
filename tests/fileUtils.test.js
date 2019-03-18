// See: https://github.com/mzgoddard/preact-render-spy
import { shallow, deep } from 'preact-render-spy';
import {
	assignFilePaths,
	getFileFromPath,
	removeFileAtPath,
	getParentPath,
	getExtensionFromFileName
} from '../src/fileUtils';

function getNestedFiles() {
	return [
		{ name: 'index.html' },
		{
			name: 'styles',
			isFolder: true,
			children: [{ name: 'main.css' }, { name: 'style.css' }]
		},
		{ name: 'script.js' }
	];
}
describe('getExtensionFromFileName', () => {
	test('should return correct extension', () => {
		expect(getExtensionFromFileName('test.js')).toBe('js');
		expect(getExtensionFromFileName('test.css')).toBe('css');
		expect(getExtensionFromFileName('test.main.css')).toBe('css');
	});
	test('should return empty string when no extension is found', () => {
		expect(getExtensionFromFileName('hello')).toBe('');
	});
});

describe('assignFilePaths', () => {
	test('should assign path on linear file system', () => {
		const files = [{ name: 'index.html' }, { name: 'main.css' }];
		assignFilePaths(files);
		expect(files[0].path).toBe('index.html');
		expect(files[1].path).toBe('main.css');
	});
	test('should assign path on nested file system', () => {
		const files = getNestedFiles();
		assignFilePaths(files);
		expect(files[0].path).toBe('index.html');
		expect(files[1].children[0].path).toBe('styles/main.css');
	});
});

describe('getFileFromPath', () => {
	test('should return file and correct index', () => {
		const files = getNestedFiles();
		assignFilePaths(files);
		const { index, file } = getFileFromPath(files, 'index.html');
		expect(index).toBe(0);
		expect(file).toBe(files[index]);
	});
	test('should return empty object for non-existent path', () => {
		const files = getNestedFiles();
		assignFilePaths(files);
		const { index, file } = getFileFromPath(files, 'style.css');
		expect(index).toBe(-1);
		expect(file).toBe(undefined);
	});
	test('should return file and correct index for a nested file', () => {
		const files = getNestedFiles();
		assignFilePaths(files);
		const { index, file } = getFileFromPath(files, 'styles/style.css');
		expect(index).toBe(1);
		expect(file).toBe(files[1].children[index]);
	});
});

describe('removeFileAtPath', () => {
	test('should remove direct child file', () => {
		const files = getNestedFiles();
		assignFilePaths(files);

		expect(files.length).toBe(3);

		removeFileAtPath(files, 'index.html');
		expect(files.length).toBe(2);
		expect(files[0].name).toBe('styles');
	});

	test('should remove a nested file', () => {
		const files = getNestedFiles();
		assignFilePaths(files);

		expect(files.length).toBe(3);

		removeFileAtPath(files, 'styles/style.css');
		expect(files.length).toBe(3);
		expect(files[1].children.length).toBe(1);
		expect(files[0].name).toBe('index.html');
		expect(files[2].name).toBe('script.js');
	});
});

describe('getParentPath', () => {
	test('should return correct parent path for root file', () => {
		expect(getParentPath('style.css')).toBe('');
	});

	test('should return correct parent path for nested file', () => {
		expect(getParentPath('styles/style.css')).toBe('styles');
		expect(getParentPath('js/plugins/main.js')).toBe('js/plugins');
		expect(getParentPath('js/plugins/readme')).toBe('js/plugins');
	});
});
