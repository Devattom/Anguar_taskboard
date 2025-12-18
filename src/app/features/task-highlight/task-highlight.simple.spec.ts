import { TaskHighlight } from './task-highlight';

describe('TaskHighlight', () => {
  it ('should init title with empty string', () => {
    const comp = new TaskHighlight();
    expect(comp.title).toBe('');
  });

  it('should allow to change the title', () => {
    const comp = new TaskHighlight();
    comp.title = 'Test';
    expect(comp.title).toBe('Test');
  });

});
