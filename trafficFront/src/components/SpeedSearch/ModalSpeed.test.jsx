// Test case 1: Modal is open
// - Check if the modal has the "block" class when isOpen is true
// - Check if the modal does not have the "hidden" class when isOpen is true
test('Modal is open', () => {
    // Set up
    const isOpen = true;
    const onClose = jest.fn();
    const speed = 50;
    const onDownloadCSV = jest.fn();
  
    // Execute
    const modal = shallow(<Modal isOpen={isOpen} onClose={onClose} speed={speed} onDownloadCSV={onDownloadCSV} />);
  
    // Assert
    expect(modal.find('.modal').hasClass('block')).toBe(true);
    expect(modal.find('.modal').hasClass('hidden')).toBe(false);
  });
  
  // Test case 2: Modal is closed
  // - Check if the modal does not have the "block" class when isOpen is false
  // - Check if the modal has the "hidden" class when isOpen is false
  test('Modal is closed', () => {
    // Set up
    const isOpen = false;
    const onClose = jest.fn();
    const speed = 50;
    const onDownloadCSV = jest.fn();
  
    // Execute
    const modal = shallow(<Modal isOpen={isOpen} onClose={onClose} speed={speed} onDownloadCSV={onDownloadCSV} />);
  
    // Assert
    expect(modal.find('.modal').hasClass('block')).toBe(false);
    expect(modal.find('.modal').hasClass('hidden')).toBe(true);
  });
  
  // Test case 3: Speed is displayed correctly
  // - Check if the speed value is displayed correctly in the modal
  test('Speed is displayed correctly', () => {
    // Set up
    const isOpen = true;
    const onClose = jest.fn();
    const speed = 50;
    const onDownloadCSV = jest.fn();
  
    // Execute
    const modal = shallow(<Modal isOpen={isOpen} onClose={onClose} speed={speed} onDownloadCSV={onDownloadCSV} />);
  
    // Assert
    expect(modal.find('p').text()).toBe('Velocidade selecionada: 50 Km/h');
  });
  
  // Test case 4: onDownloadCSV function is called when Download CSV button is clicked
  // - Check if the onDownloadCSV function is called when the Download CSV button is clicked
  test('onDownloadCSV function is called', () => {
    // Set up
    const isOpen = true;
    const onClose = jest.fn();
    const speed = 50;
    const onDownloadCSV = jest.fn();
  
    // Execute
    const modal = shallow(<Modal isOpen={isOpen} onClose={onClose} speed={speed} onDownloadCSV={onDownloadCSV} />);
    modal.find('.bg-blue-500').simulate('click');
  
    // Assert
    expect(onDownloadCSV).toHaveBeenCalled();
  });
  
  // Test case 5: onClose function is called when Close button is clicked
  // - Check if the onClose function is called when the Close button is clicked
  test('onClose function is called', () => {
    // Set up
    const isOpen = true;
    const onClose = jest.fn();
    const speed = 50;
    const onDownloadCSV = jest.fn();
  
    // Execute
    const modal = shallow(<Modal isOpen={isOpen} onClose={onClose} speed={speed} onDownloadCSV={onDownloadCSV} />);
    modal.find('.bg-gray-300').simulate('click');
  
    // Assert
    expect(onClose).toHaveBeenCalled();
  });
  